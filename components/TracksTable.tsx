import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useSpotify } from "../context/SpotifyContext";
import { Track } from "../types/types";
import { fmtMSS } from "../utils/formatDuration";

interface IProps {
  tracks: Track[];
  noAlbum?: boolean;
  noArtist?: boolean;
}

export default function TracksTable({
  tracks,
  noAlbum = false,
  noArtist = false,
}: IProps) {
  const { setCurrentTrack } = useSpotify();

  const [updatedTracks, setUpdatedTracks] = useState([]);

  useEffect(() => {
    setUpdatedTracks(tracks);
  }, [tracks]);

  const playTrack = (track: Track) => {
    if (track.preview_url) {
      setCurrentTrack(track);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-2 p-1">
      {!noArtist && (
        <>
          <div className="col-span-1 text-sm font-medium tracking-wider text-left uppercase text-gray">
            #
          </div>

          <div
            className={`${
              noAlbum ? "col-span-10" : "col-span-6"
            } text-sm font-medium tracking-wider text-left uppercase text-gray`}
          >
            Title
          </div>

          {!noAlbum && (
            <div className="col-span-4 text-sm font-medium tracking-wider text-left uppercase text-gray">
              Album
            </div>
          )}

          <div className="col-span-1 text-sm font-medium tracking-wider text-left uppercase text-gray">
            <span className="flex items-center material-icons">schedule</span>
          </div>

          <div className="col-span-12 my-3 border-b border-gray"></div>
        </>
      )}

      {updatedTracks?.map((track, index) => (
        <Fragment key={track.id + index}>
          <div className="flex items-center col-span-1 my-3 text-sm text-gray">
            {index + 1}
          </div>

          <div
            className={`${
              noAlbum ? "col-span-10" : "col-span-6"
            } flex items-center w-full  my-3`}
          >
            <div className="flex items-center w-full gap-4">
              {(!noAlbum || noArtist) && (
                <div className="flex-shrink-0 w-10 h-10">
                  <img
                    src={track.album.images?.[0].url as string}
                    alt={track.name}
                    className="object-contain w-10 h-10"
                  />
                </div>
              )}

              <div className="w-full">
                <h2
                  className={`w-10/12 text-sm font-medium truncate ${
                    track.preview_url
                      ? "cursor-pointer hover:underline"
                      : "cursor-default"
                  }`}
                  onClick={() => playTrack(track)}
                >
                  {track.name}
                </h2>

                {!noArtist && (
                  <div className="flex flex-wrap items-center w-10/12 gap-1 text-sm text-gray">
                    <span className="truncate ">
                      {track.artists.map((artist, index) => (
                        <Link
                          key={artist.id + track.id}
                          href={`/artist/${artist.id}`}
                        >
                          <a>
                            <span className="hover:text-white hover:underline">
                              {index !== 0 ? `, ${artist.name}` : artist.name}
                            </span>
                          </a>
                        </Link>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {!noAlbum && (
            <div className="flex items-center w-10/12 col-span-4 my-3 text-sm text-gray">
              <Link href={`/album/${track.album.id}`}>
                <a className="truncate hover:text-white hover:underline">
                  {track.album.name}
                </a>
              </Link>
            </div>
          )}

          <div className="flex items-center col-span-1 my-3 text-sm text-gray ">
            {fmtMSS(track.duration_ms)}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
