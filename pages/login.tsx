import Image from "next/image";
import { signIn } from "next-auth/react";
import Layout from "../components/layout";

export default function Login() {
	const handleLogin = () => {
		signIn("spotify", { callbackUrl: process.env.NEXTAUTH_URL });
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
					className="flex rounded-full bg-primary hover:bg-primary/80 px-12 py-2 text-lg uppercase tracking-widest hover:bg-opacity-80 focus:outline-none"
					onClick={handleLogin}
				>
					Login
				</button>
			</div>
		</Layout>
	);
}
