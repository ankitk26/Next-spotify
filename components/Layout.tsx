import Head from "next/head";
import { useRouter } from "next/router";

interface IProps {
  children: any;
  title: string;
}

export default function Layout({ children, title }: IProps) {
  const router = useRouter();

  return (
    <>
      <Head>
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
