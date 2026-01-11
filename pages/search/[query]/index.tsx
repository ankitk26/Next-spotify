import type { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "next-auth/react";
import AlbumList from "../../../components/album-list";
import ArtistList from "../../../components/artist-list";
import Heading from "../../../components/heading";
import Layout from "../../../components/layout";
import PlaylistList from "../../../components/playlist-list";
// LEGACY CODE: useSpotify setCurrentTrack commented out - Spotify has disabled previews
// import { useSpotify } from "../../../context/spotify-context";
import type { SearchResults } from "../../../types/types";
import { customGet } from "../../../utils/custom-get";
import { fmtMSS } from "../../../utils/format-duration";
import { isAuthenticated } from "../../../utils/is-authenticated";

interface IProps {
	query: string;
	searchResults: SearchResults;
}

export default function Search({ query, searchResults }: IProps) {
	// LEGACY CODE: Spotify has disabled previews, so track playback is commented out
	// const { setCurrentTrack } = useSpotify();

	// const playTrack = (track: Track) => {
	//   if (track.preview_url) {
	//     setCurrentTrack(track);
	//   }
	// };

	return (
		<Layout title="Spotify - Search">
			{searchResults && (
				<>
					<div className="mt-5">
						<Link href={`/search/${query}/tracks`}>
							<Heading text="Songs" />
						</Link>

						{searchResults.tracks?.items?.slice(0, 5).map((track) => (
							<div
								className="col-span-12 grid grid-cols-12 p-1"
								// LEGACY CODE: track.preview_url opacity check removed - Spotify has disabled previews
								key={track.id}
							>
								<div className="col-span-11 my-3 flex w-full items-center">
									<div className="flex w-full items-center gap-4">
										<div className="h-10 w-10 shrink-0">
											<Image
												alt={track.name}
												className="h-10 w-10 object-contain"
												height={40}
												src={track.album.images?.[0]?.url ?? "/placeholder"}
												width={40}
											/>
										</div>

										<div className="w-full">
											<div
												className="w-10/12 cursor-default truncate font-medium text-sm"
												// LEGACY CODE: onClick={() => playTrack(track)} - Spotify has disabled previews
											>
												{track.name}
											</div>

											<div className="flex w-10/12 flex-wrap items-center gap-1 text-gray text-sm">
												<span className="truncate">
													{track.artists.map((artist, index) => (
														<Link href={`/artist/${artist.id}`} key={artist.id}>
															<span className="hover:text-white hover:underline">
																{index !== 0 ? `, ${artist.name}` : artist.name}
															</span>
														</Link>
													))}
												</span>
											</div>
										</div>
									</div>
								</div>

								<div className="col-span-1 my-3 flex items-center text-gray text-sm">
									{fmtMSS(track.duration_ms)}
								</div>
							</div>
						))}
					</div>

					{searchResults.artists && searchResults.artists.items.length > 0 && (
						<div className="mt-5">
							<Link href={`/search/${query}/artists`}>
								<Heading text="Artists" />
							</Link>
							<ArtistList artists={searchResults.artists.items.slice(0, 6)} />
						</div>
					)}

					<div className="mt-5">
						<Link href={`/search/${query}/albums`}>
							<Heading text="Albums" />
						</Link>
						<AlbumList
							albums={
								searchResults.albums
									? searchResults.albums.items.slice(0, 6)
									: []
							}
						/>
					</div>

					<div className="mt-5">
						<Link href={`/search/${query}/playlists`}>
							<Heading text="Playlists" />
						</Link>
						<PlaylistList
							playlists={
								searchResults.playlists
									? searchResults.playlists.items.slice(0, 6)
									: []
							}
						/>
					</div>
				</>
			)}
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
	const searchResults = await customGet(
		`https://api.spotify.com/v1/search?q=${query}&market=from_token&type=album,artist,track,playlist&limit=50`,
		session
	);
	return { props: { query, searchResults } };
};
