import '../styles/globals.css';
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps: { session, ...pageProps } }
) {
  return (
    // bc this is a higher order component, we can use it to wrap other components
    // this will allow us to persist that login state throughout our app
    // We cannot use state functions like useSession without wrapping the app in a higher order component
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp
