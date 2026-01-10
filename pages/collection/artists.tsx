import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import ArtistList from "../../components/artist-list";
import Heading from "../../components/heading";
import Layout from "../../components/layout";
import type { Artist } from "../../types/types";
import { customGet } from "../../utils/custom-get";
import { isAuthenticated } from "../../utils/is-authenticated";

interface IProps {
  followedArtists: Artist[];
}

export default function FollowedArtists({ followedArtists }: IProps) {
  return (
    <Layout title="Spotify - Your Library">
      <Heading text="Artists" />
      <ArtistList artists={followedArtists} />
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

  const followedArtists = await customGet(
    "https://api.spotify.com/v1/me/following?type=artist&limit=50",
    session
  );

  return { props: { followedArtists: followedArtists.artists.items } };
};
