import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Layout from "../components/Layout";
import PreviewPlayer from "../components/PreviewPlayer";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return router.pathname === "/login" ? (
    <Layout pageProps={pageProps}>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <div className="flex flex-col h-screen">
      <Layout pageProps={pageProps}>
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
      </Layout>
    </div>
  );
}

export default MyApp;
