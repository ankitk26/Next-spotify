import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import ArtistList from "../../components/ArtistList";
import Heading from "../../components/Heading";
import Layout from "../../components/Layout";
import { Artist } from "../../types/types";
import { customGet } from "../../utils/customGet";
import { isAuthenticated } from "../../utils/isAuthenticated";

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
    `https://api.spotify.com/v1/me/following?type=artist&limit=50`,
    session
  );

  return { props: { followedArtists: followedArtists.artists.items } };
};
