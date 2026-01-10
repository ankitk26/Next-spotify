import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import nProgress from "nprogress";
import { useEffect } from "react";
import Header from "../components/header";
// LEGACY CODE: PreviewPlayer commented out - Spotify has disabled previews
// import PreviewPlayer from "../components/preview-player";
import Sidebar from "../components/sidebar";
// LEGACY CODE: PlayerProvider commented out - Spotify has disabled previews
// import PlayerProvider from "../context/player-context";
import { SpotifyProvider } from "../context/spotify-context";
import "../styles/globals.css";
import "../styles/nonTailwind.css";

nProgress.configure({
  showSpinner: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => {
      nProgress.start();
    };
    const handleStop = () => {
      nProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <SessionProvider session={pageProps.session}>
      <SpotifyProvider>
        {/* LEGACY CODE: PlayerProvider commented out - Spotify has disabled previews */}
        {/* <PlayerProvider> */}
        {router.pathname === "/login" ? (
          <Component {...pageProps} />
        ) : (
          <>
            <Sidebar />
            <div className="ml-64 flex flex-col">
              <Header />
              <main className="mt-4 ml-4">
                <Component {...pageProps} />
              </main>
            </div>
            {/* LEGACY CODE: Player components commented out - Spotify has disabled previews */}
            {/* <PlayerTwo /> */}
            {/* <PreviewPlayer /> */}
          </>
        )}
        {/* </PlayerProvider> */}
      </SpotifyProvider>
    </SessionProvider>
  );
}

export default MyApp;
