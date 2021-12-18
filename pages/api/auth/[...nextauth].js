import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import { refreshAccessToken } from "spotify-web-api-node/src/server-methods"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"


//
// Takes a token, and returns a new token with updated
// `accessToken` and `accessTokenExpires`. If an error occurs,
// returns the old token and an error property
//
async function refreshedAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    
    // we are renaming this lol when refreshing out access Token
    // also this refreshAccessToken is a different built in function inside spotifyApi
    // we are sending both the refresh and access tokens back to spotify so they can give us a new access token
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    // dont log this in production
    console.log("REFRESHED TOKEN IS"), refreshedToken;

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // 1 hour as 3600 returns from spotify API
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // Replace if new one came back else fall back to old refresh token
    }
  } catch (error) {
    console.error(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

// This is the function that is ran everytime the user tries to login or refresh the app
//
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      // ENVIRONMENT VARIABLES
      // we don't want to see this so we store it in a seperate file
      // thats not pushed to github (env) this keeps track of the "secret" things
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  // this will set a custom login page we can create and use to run the next auth login
  pages: {
    signIn: '/login',
  },
  // now without this, if we let spotify handle the rest of the nextauth flow, it would give us a basic (bare minimum) token with things such as the name
  // profile, etc. So we can use these callbacks to level-up our tokens to recieve more data as well as use the refresh token
  // to update the accesstoken and keep the page updated and user logged in

  // so when logging into spotify, they will give you a jwt token that has a bunch of info inside of it
  callbacks: {
    async jwt({ token, account, user }){
      // inital sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, // we are handling expirt times in MIlliseconds hence * 1000
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log("EXISTING ACCESS TOKEN IS VALID");
        return token;
      }

      // Access token has expired, so we need to refresh it...
      console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
      return await refreshedAccessToken(token);
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    }
  },
});