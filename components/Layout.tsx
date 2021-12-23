import Head from "next/head";
import { useRouter } from "next/router";

interface IProps {
  children: any;
  title?: string;
}

export default function Layout({ children, title }: IProps) {
  const router = useRouter();

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
        <title>{title}</title>
      </Head>
      <section
        className={`w-full ${router.pathname === "/login" ? "" : "p-4"}`}
      >
        {children}
      </section>
    </>
  );
}
