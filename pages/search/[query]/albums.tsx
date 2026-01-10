import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import AlbumList from "../../../components/album-list";
import Heading from "../../../components/heading";
import Layout from "../../../components/layout";
import type { Album } from "../../../types/types";
import { customGet } from "../../../utils/custom-get";
import { isAuthenticated } from "../../../utils/is-authenticated";

interface IProps {
  query: string;
  searchAlbums: {
    albums: {
      items: Album[];
    };
  };
}

export default function SearchAlbums({ query, searchAlbums }: IProps) {
  return (
    <Layout title="Spotify - Search">
      <Heading text={`All albums for "${query}"`} />
      <AlbumList albums={searchAlbums.albums.items} />
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
  const searchAlbums = await customGet(
    `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=album&limit=50`,
    session
  );
  return { props: { query, searchAlbums } };
};
