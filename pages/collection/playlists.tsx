import type { GetServerSideProps } from "next";
import Link from "next/link";
import { getSession } from "next-auth/react";
import CardItem from "@/components/card-item";
import CardItemGrid from "@/components/card-item-grid";
import Heading from "@/components/heading";
import Layout from "@/components/layout";
import { useSpotify } from "@/context/spotify-context";
import type { PlaylistType } from "@/types/types";
import { customGet } from "@/utils/custom-get";
import { isAuthenticated } from "@/utils/is-authenticated";

interface IProps {
	likedTracks: PlaylistType;
}

export default function UserPlaylists({ likedTracks }: IProps) {
	const { playlists } = useSpotify();

	return (
		<Layout title="Spotify - Your Library">
			<Heading text="Playlists" />
			<CardItemGrid>
				<Link href="/collection/tracks" passHref>
					<div
						className="col-span-2 flex cursor-pointer flex-col items-start justify-end gap-8 rounded p-4"
						style={{
							background:
								"linear-gradient(149.46deg, var(--color-gradient-start), var(--color-gradient-end) 99.16%)",
						}}
					>
						<div className="inline">
							{likedTracks?.items?.map(({ track }) => (
								<span className="mr-3" key={track.id}>
									<span>{track.artists[0].name}</span>{" "}
									<span className="text-white opacity-70">{track.name}</span>
								</span>
							))}
						</div>
						<div>
							<h1 className="font-bold text-4xl">Liked songs</h1>
							<h3 className="mt-1">{likedTracks.total} liked songs</h3>
						</div>
					</div>
				</Link>

				{playlists?.map((playlist) => (
					<CardItem
						altTitle={playlist.name}
						heading={playlist.name}
						id={playlist.id}
						images={playlist.images}
						key={playlist.id}
						subheading={playlist.description}
						type="playlist"
					/>
				))}
			</CardItemGrid>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	if (!isAuthenticated(session)) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	const likedTracks = await customGet(
		"https://api.spotify.com/v1/me/tracks?market=from_token&limit=5",
		session
	);

	return { props: { likedTracks } };
};
