import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { SpotifyProvider } from "../context/SpotifyContext";

export default function Layout({ children, pageProps }: any) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
        <title>Next-spotify</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <SpotifyProvider>{children}</SpotifyProvider>
      </SessionProvider>
    </>
  );
}
