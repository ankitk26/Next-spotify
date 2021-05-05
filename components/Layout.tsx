import { Provider } from "next-auth/client";
import Head from "next/head";
import { SpotifyProvider } from "../context/SpotifyContext";

export default function Layout({ children, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        />
        <title>Next-spotify</title>
      </Head>
      <Provider session={pageProps.session}>
        <SpotifyProvider>{children}</SpotifyProvider>
      </Provider>
    </>
  );
}
