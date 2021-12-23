import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Heading from "../../../components/Heading";
import Layout from "../../../components/Layout";
import PlaylistList from "../../../components/PlaylistList";
import { PlaylistType } from "../../../types/types";
import { customGet } from "../../../utils/customGet";
import { isAuthenticated } from "../../../utils/isAuthenticated";

interface IProps {
  query: string;
  searchPlaylists: {
    playlists: {
      items: PlaylistType[];
    };
  };
}

export default function SearchPlaylists({ query, searchPlaylists }: IProps) {
  return (
    <Layout title="Spotify - Search">
      <Heading text={`All playlists for ${query}`} />
      <PlaylistList playlists={searchPlaylists.playlists.items} />
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
  const searchPlaylists = await customGet(
    `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=playlist&limit=50`,
    session
  );
  return { props: { query, searchPlaylists } };
};
