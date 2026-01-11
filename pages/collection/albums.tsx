import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import AlbumList from "@/components/album-list";
import Heading from "@/components/heading";
import Layout from "@/components/layout";
import type { Album } from "@/types/types";
import { customGet } from "@/utils/custom-get";
import { isAuthenticated } from "@/utils/is-authenticated";

interface IProps {
	albums: Album[];
}

export default function Albums({ albums }: IProps) {
	return (
		<Layout title="Spotify - Your Library">
			<Heading text="Albums" />
			<AlbumList albums={albums} />
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);
	if (!(await isAuthenticated(session))) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	const { items } = await customGet(
		"https://api.spotify.com/v1/me/albums?market=from_token&limit=50",
		session
	);

	return { props: { albums: items.map((item) => item.album) } };
};
