import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import AlbumList from "../components/album-list";
import Heading from "../components/heading";
import Layout from "../components/layout";
import { customGet } from "../utils/custom-get";
import { getGreeting } from "../utils/get-greeting";
import { isAuthenticated } from "../utils/is-authenticated";

export default function Home({ newReleases }: { newReleases: any }) {
	return (
		<Layout title="Welcome to Spotify">
			<h1 className="mb-5 font-bold text-3xl">Good {getGreeting()}</h1>

			<Heading className="mt-10" text="New releases" />
			<AlbumList albums={newReleases?.albums.items} />

			{/* <Heading className="mt-16" text={featuredPlaylists?.message} />
			<PlaylistList playlists={featuredPlaylists?.playlists.items} /> */}
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const isAuth = await isAuthenticated(session);

	if (!isAuth) {
		return {
			redirect: {
				destination: "/login",
				permanent: false
			}
		};
	}

	const newReleases = await customGet(
		"https://api.spotify.com/v1/browse/new-releases?country=IN&limit=24",
		session
	);

	return { props: { newReleases } };
};
