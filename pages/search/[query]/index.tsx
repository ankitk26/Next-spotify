import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";
import AlbumList from "../../../components/AlbumList";
import ArtistList from "../../../components/ArtistList";
import Heading from "../../../components/Heading";
import PlaylistList from "../../../components/PlaylistList";
import { useSpotify } from "../../../context/SpotifyContext";
import { SearchResults, Track } from "../../../types/types";
import { customGet } from "../../../utils/customGet";
import { fmtMSS } from "../../../utils/formatDuration";
import { isAuthenticated } from "../../../utils/isAuthenticated";

interface IProps {
  query: string;
  searchResults: SearchResults;
}

export default function Search({ query, searchResults }: IProps) {
  const { setCurrentTrack } = useSpotify();

  const playTrack = (track: Track) => {
    if (track.preview_url) {
      setCurrentTrack(track);
    }
  };

  return (
    <div>
      {searchResults && (
        <>
          <div className="p-4 mt-5">
            <Link href={`/search/${query}/tracks`}>
              <a>
                <Heading text="Songs" />
              </a>
            </Link>

            <div className="grid grid-cols-12 gap-2 p-1">
              {JSON.stringify(
                fmtMSS(searchResults.tracks.items[0].duration_ms)
              )}

              {searchResults.tracks.items?.slice(0, 5).map((track) => (
                <Fragment key={track.id}>
                  <div className="flex items-center w-full col-span-11 my-3">
                    <div className="flex items-center w-full gap-4">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          src={track.album.images[0].url}
                          alt={track.name}
                          className="object-contain w-10 h-10"
                        />
                      </div>

                      <div className="w-full">
                        <div
                          className={`w-10/12 text-sm font-medium truncate ${
                            track.preview_url
                              ? "cursor-pointer hover:underline"
                              : "cursor-default"
                          }`}
                          onClick={() => playTrack(track)}
                        >
                          {track.name}
                        </div>

                        <div className="flex flex-wrap items-center w-10/12 gap-1 text-sm text-gray">
                          <span className="truncate ">
                            {track.artists.map((artist, index) => (
                              <Link
                                key={artist.id}
                                href={`/artist/${artist.id}`}
                              >
                                <a>
                                  <span className="hover:text-white hover:underline">
                                    {index !== 0
                                      ? `, ${artist.name}`
                                      : artist.name}
                                  </span>
                                </a>
                              </Link>
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center col-span-1 my-3 text-sm text-gray ">
                    {fmtMSS(track.duration_ms)}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          {searchResults.artists.items.length > 0 && (
            <div className="p-4 mt-5">
              <Link href={`/search/${query}/artists`}>
                <a>
                  <Heading text="Artists" />
                </a>
              </Link>
              <ArtistList artists={searchResults.artists.items.slice(0, 5)} />
            </div>
          )}

          <div className="p-4 mt-5">
            <Link href={`/search/${query}/albums`}>
              <a>
                <Heading text="Albums" />
              </a>
            </Link>
            <AlbumList albums={searchResults.albums.items.slice(0, 5)} />
          </div>

          <div className="p-4 mt-5">
            <Link href={`/search/${query}/playlists`}>
              <a>
                <Heading text="Playlists" />
              </a>
            </Link>
            <PlaylistList
              playlists={searchResults.playlists.items.slice(0, 5)}
            />
          </div>
        </>
      )}
    </div>
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