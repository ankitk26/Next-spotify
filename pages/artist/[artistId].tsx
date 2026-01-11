import type { GetServerSideProps } from "next";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { RiMusic2Fill } from "react-icons/ri";
import AlbumList from "../../components/album-list";
import Heading from "../../components/heading";
import Layout from "../../components/layout";
import TracksTable from "../../components/tracks-table";
import type { Album, Artist, Track } from "../../types/types";
import { customGet } from "../../utils/custom-get";
import { isAuthenticated } from "../../utils/is-authenticated";

interface Albums {
  items: Album[];
}

interface IProps {
  artist: Artist;
  artistTracks: Track[];
  artistAlbums: Albums;
  artistSingles: Albums;
  artistAppearsOn: Albums;
  artistCompilation: Albums;
}

export default function SingleArtist({
  artist,
  artistTracks,
  artistAlbums,
  artistSingles,
  artistAppearsOn,
  artistCompilation,
}: IProps) {
  return (
    <Layout title={`Spotify - ${artist?.name}`}>
      <div className="flex items-end gap-6">
        {artist && (
          <>
            {artist.images && artist.images.length > 0 ? (
              <Image
                alt={artist.name}
                className="h-52 w-52 rounded-full object-contain"
                height={208}
                src={artist.images[0].url ?? "/placeholder"}
                width={208}
              />
            ) : (
              <div className="h-40 w-full">
                <RiMusic2Fill className="h-full w-full bg-paper" />
              </div>
            )}
            <div className="flex flex-col items-start gap-3">
              <h2 className="font-bold text-5xl">{artist.name}</h2>
              <span className="text-sm">
                {artist.followers?.total.toLocaleString()} followers
              </span>
              <div className="flex items-center gap-5 text-sm">
                {artist.genres?.map((genre) => (
                  <span key={genre}>{genre}</span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-8">
        <Heading text="Popular" />
        <div className="-mt-8">
          <TracksTable noAlbum noArtist tracks={artistTracks} />
        </div>
      </div>

      {artistAlbums?.items.length > 0 && (
        <div className="mt-12">
          <Heading text="Albums" />
          <AlbumList albums={artistAlbums.items} />
        </div>
      )}

      {artistSingles?.items.length > 0 && (
        <div className="mt-12">
          <Heading text="Singles" />
          <AlbumList albums={artistSingles.items} />
        </div>
      )}

      {artistAppearsOn?.items.length > 0 && (
        <div className="mt-12">
          <Heading text="Appears on" />
          <AlbumList albums={artistAppearsOn.items} />
        </div>
      )}

      {artistCompilation?.items.length > 0 && (
        <div className="mt-12">
          <Heading text="Compilation" />
          <AlbumList albums={artistCompilation.items} />
        </div>
      )}

      {/* {relatedArtists?.artists.length > 0 && (
				<div className="mt-12">
					<Heading text="Fans also like" />
					<ArtistList artists={relatedArtists.artists} />
				</div> */}
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

  const artistId = ctx.params?.artistId;
  const artist = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}`,
    session
  );

  const artistTracks = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=from_token`,
    session
  );

  const artistAlbums = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album`,
    session
  );

  const artistSingles = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single`,
    session
  );

  const artistAppearsOn = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=appears_on`,
    session
  );

  const artistCompilation = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=compilation`,
    session
  );

  return {
    props: {
      artist,
      artistTracks: artistTracks.tracks,
      artistAlbums,
      artistSingles,
      artistAppearsOn,
      artistCompilation,
    },
  };
};
