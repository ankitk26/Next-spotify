import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import nProgress from "nprogress";
import { useEffect } from "react";
import Header from "../components/Header";
import PreviewPlayer from "../components/PreviewPlayer";
import Sidebar from "../components/Sidebar";
import { SpotifyProvider } from "../context/SpotifyContext";
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
        {/* <div className="flex flex-col h-screen"> */}
        {router.pathname === "/login" ? (
          <Component {...pageProps} />
        ) : (
          <>
            <Sidebar />
            <div className="flex flex-col ml-64">
              <Header />
              <main className="ml-4 mt-4">
                <Component {...pageProps} />
              </main>
            </div>
            <PreviewPlayer />
          </>
        )}
        {/* </div> */}
      </SpotifyProvider>
    </SessionProvider>
  );
}

export default MyApp;
