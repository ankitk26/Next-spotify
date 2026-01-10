import Link from "next/link";
import { MdSchedule } from "react-icons/md";
import { usePlayer } from "../context/PlayerContext";
import type { Track } from "../types/types";
import { fmtMSS } from "../utils/formatDuration";

interface IProps {
	tracks: Track[];
	noAlbum?: boolean;
	noArtist?: boolean;
}

export default function TracksTable({
	tracks,
	noAlbum = false,
	noArtist = false
}: IProps) {
	const { setCurrentTrack } = usePlayer();

	const playTrack = (track: Track) => {
		if (track.preview_url) {
			setCurrentTrack(track);
		}
	};

	return (
		<div className="mt-8 grid grid-cols-12 gap-2 p-1">
			{!noArtist && (
				<>
					<div className="col-span-1 text-left font-semibold text-white uppercase tracking-wider">
						#
					</div>

					<div
						className={`${
							noAlbum ? "col-span-10" : "col-span-6"
						} text-left font-medium text-gray text-sm uppercase tracking-wider`}
					>
						Title
					</div>

					{!noAlbum && (
						<div className="col-span-4 text-left font-medium text-gray text-sm uppercase tracking-wider">
							Album
						</div>
					)}

					<div className="col-span-1 text-left font-medium text-gray text-sm uppercase tracking-wider">
						<MdSchedule className="text-xl" />
					</div>

					<div className="col-span-12 my-3 border-gray border-b" />
				</>
			)}

			<div className="col-span-12 w-full">
				{tracks?.map((track, index) => (
					<div
						className={`grid grid-cols-12 ${
							track.preview_url ? "" : "opacity-50"
						}`}
						key={track.id + index + 1}
					>
						<div className="col-span-1 my-3 flex items-center text-gray text-sm">
							{index + 1}
						</div>

						<div
							className={`${
								noAlbum ? "col-span-10" : "col-span-6"
							} my-3 flex w-full items-center`}
						>
							<div className="flex w-full items-center gap-4">
								{(!noAlbum || noArtist) && (
									<div className="h-10 w-10 shrink-0">
										<img
											alt={track.name}
											className="h-10 w-10 object-contain"
											src={track.album.images?.[0].url ?? "/placeholder"}
										/>
									</div>
								)}

								<div className="w-full">
									<h2
										className={`w-10/12 truncate font-medium text-sm ${
											track.preview_url
												? "cursor-pointer hover:underline"
												: "cursor-default"
										}`}
										onClick={() => playTrack(track)}
									>
										{track.name}
									</h2>

									{!noArtist && (
										<div className="flex w-10/12 flex-wrap items-center gap-1 text-gray text-sm">
											<span className="truncate">
												{track.artists.map((artist, index) => (
													<Link
														href={`/artist/${artist.id}`}
														key={artist.id + track.id}
													>
														<span className="hover:text-white hover:underline">
															{index !== 0 ? `, ${artist.name}` : artist.name}
														</span>
													</Link>
												))}
											</span>
										</div>
									)}
								</div>
							</div>
						</div>

						{!noAlbum && (
							<div className="col-span-4 my-3 flex w-10/12 items-center text-gray text-sm">
								<Link href={`/album/${track.album.id}`}>
									<a className="truncate hover:text-white hover:underline">
										{track.album.name}
									</a>
								</Link>
							</div>
						)}

						<div className="col-span-1 my-3 flex items-center text-gray text-sm">
							{fmtMSS(track.duration_ms)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
