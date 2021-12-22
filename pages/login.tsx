import { signIn } from "next-auth/react";
import Layout from "../components/Layout";

export default function Login() {
  const handleLogin = () => {
    signIn("spotify", { callbackUrl: "http://localhost:3000" });
  };

  return (
    <Layout title="Log in to Spotify">
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-20">
        <img
          src="/images/spotify_logo.png"
          alt="spotify logo"
          className="object-contain h-24 w-80"
        />
        <button
          className="flex px-12 py-2 text-lg tracking-widest uppercase rounded-full focus:outline-none bg-primary hover:bg-opacity-80"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </Layout>
  );
}
