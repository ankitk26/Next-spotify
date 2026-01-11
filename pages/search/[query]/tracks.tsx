import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Heading from "../../../components/heading";
import Layout from "../../../components/layout";
import TracksTable from "../../../components/tracks-table";
import type { Track } from "../../../types/types";
import { customGet } from "../../../utils/custom-get";
import { isAuthenticated } from "../../../utils/is-authenticated";

interface IProps {
	query: string;
	searchTracks: {
		tracks: {
			items: Track[];
		};
	};
}

export default function SearchTracks({ query, searchTracks }: IProps) {
	return (
		<Layout title="Spotify - Search">
			<Heading text={`All songs for ${query}`} />
			<TracksTable tracks={searchTracks?.tracks.items} />
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

	const query = ctx.params?.query;
	const searchTracks = await customGet(
		`https://api.spotify.com/v1/search?q=${query}&market=from_token&type=track&limit=50`,
		session
	);
	return { props: { query, searchTracks } };
};
