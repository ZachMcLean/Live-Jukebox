// spotify web api package
// this is a utility folder for things we need for spotify
// npm install spotify-web-api-node
import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-email",
    "streaming",
    "user-read-private",
    "user-library-read",
    "user-top-read",
// "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-follow-read",
].join(',');

const params = {
    scope: scopes,
};

// We basically set every individual scope into a single string that we will use
// to concatenate at the end of the autorize URL
// This allows us to programatically set the scope value when querying from spotify
const queryParamString = new URLSearchParams(params).toString();

// const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamString.toString();
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});
// this basically grabs the default spotify api if LOGIN_URL is not found
export default spotifyApi;

// remember this is what we needed for nextauth
export { LOGIN_URL }