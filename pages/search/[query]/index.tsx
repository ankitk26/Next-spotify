import { GetServerSideProps } from "next";
import Link from "next/link";
import AlbumList from "../../../components/AlbumList";
import ArtistList from "../../../components/ArtistList";
import Heading from "../../../components/Heading";
import PlaylistList from "../../../components/PlaylistList";
import { SearchResults } from "../../../types/types";
import { customGet } from "../../../utils/customGet";
import { formatDuration } from "../../../utils/formatDuration";

interface SearchProps {
  query: string;
  searchResults: SearchResults;
}

export default function Search({ query, searchResults }: SearchProps) {
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
              {searchResults.tracks.items?.slice(0, 5).map((track) => (
                <>
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
                        <div className="w-10/12 text-sm font-medium truncate">
                          {track.name}
                        </div>

                        <div className="flex flex-wrap items-center w-10/12 gap-1 text-sm text-gray">
                          <span className="truncate ">
                            {track.artists.map((artist, index) => (
                              <Link href={`/artist/${artist.id}`}>
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
                    {formatDuration(track.duration_ms)}
                  </div>
                </>
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
  const query = ctx.params?.query;
  const searchResults = await customGet(
    `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=album,artist,track,playlist&limit=50`,
    ctx
  );
  return { props: { query, searchResults } };
};
