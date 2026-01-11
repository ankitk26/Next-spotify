import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { RiLoader2Fill } from "react-icons/ri";
import Layout from "../components/layout";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    signIn("spotify", { callbackUrl: "/" });
  };

  return (
    <Layout title="Log in to Spotify">
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-20">
        <Image
          alt="spotify logo"
          height={96}
          // objectFit="contain"
          src="/images/spotify_logo.png"
          width={320}
        />
        <button
          className="relative flex h-12 items-center justify-center rounded-full bg-primary px-12 py-2 text-lg uppercase tracking-widest hover:bg-primary/80 hover:bg-opacity-80 focus:outline-none"
          disabled={isLoading}
          onClick={handleLogin}
          type="button"
        >
          <span className={isLoading ? "invisible" : ""}>Login</span>
          <RiLoader2Fill
            className={`absolute animate-spin ${isLoading ? "" : "invisible"}`}
          />
        </button>
      </div>
    </Layout>
  );
}
