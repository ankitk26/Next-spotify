import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Header from "../components/Header";
import PreviewPlayer from "../components/PreviewPlayer";
import Sidebar from "../components/Sidebar";
import { SpotifyProvider } from "../context/SpotifyContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider session={pageProps.session}>
      <SpotifyProvider>
        <div className="flex flex-col h-screen">
          {router.pathname === "/login" ? (
            <Component {...pageProps} />
          ) : (
            <>
              <div className="grid flex-grow grid-cols-6">
                <Sidebar />
                <div className="flex flex-col col-span-5">
                  <Header />
                  <main className="p-5">
                    <Component {...pageProps} />
                  </main>
                </div>
              </div>
              <PreviewPlayer />
            </>
          )}
        </div>
      </SpotifyProvider>
    </SessionProvider>
  );
}

export default MyApp;
