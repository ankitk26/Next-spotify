import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import CardItem from "../../components/CardItem";
import CardItemGrid from "../../components/CardItemGrid";
import Heading from "../../components/Heading";
import Layout from "../../components/Layout";
import { useSpotify } from "../../context/SpotifyContext";
import { PlaylistType } from "../../types/types";
import { customGet } from "../../utils/customGet";
import { isAuthenticated } from "../../utils/isAuthenticated";

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
            className="flex flex-col items-start justify-end col-span-2 gap-8 p-4 rounded cursor-pointer"
            style={{
              background: "linear-gradient(149.46deg,#450af5,#8e8ee5 99.16%)",
            }}
          >
            <div className="inline">
              {likedTracks?.items.map(({ track }) => (
                <span key={track.id} className="mr-3">
                  <span>{track.artists[0].name}</span>{" "}
                  <span className="text-white opacity-70">{track.name}</span>
                </span>
              ))}
            </div>
            <div>
              <h1 className="text-4xl font-bold">Liked songs</h1>
              <h3 className="mt-1">{likedTracks.total} liked songs</h3>
            </div>
          </div>
        </Link>

        {playlists?.map((playlist) => (
          <CardItem
            key={playlist.id}
            heading={playlist.name}
            id={playlist.id}
            images={playlist.images}
            altTitle={playlist.name}
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
    `https://api.spotify.com/v1/me/tracks?market=from_token&limit=5`,
    session
  );

  return { props: { likedTracks } };
};
