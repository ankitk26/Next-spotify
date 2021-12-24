import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import AlbumList from "../components/AlbumList";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import PlaylistList from "../components/PlaylistList";
import { customGet } from "../utils/customGet";
import { getGreeting } from "../utils/getGreeting";
import { isAuthenticated } from "../utils/isAuthenticated";

export default function Home({ newReleases, featuredPlaylists }) {
  return (
    <Layout title="Welcome to Spotify">
      <h1 className="mb-5 text-3xl font-bold">Good {getGreeting()}</h1>

      <Heading text="New releases" className="mt-10" />
      <AlbumList albums={newReleases?.albums.items} />

      <Heading text={featuredPlaylists?.message} className="mt-16" />
      <PlaylistList playlists={featuredPlaylists?.playlists.items} />
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

  const newReleases = await customGet(
    "https://api.spotify.com/v1/browse/new-releases?country=IN&limit=25",
    session
  );

  const featuredPlaylists = await customGet(
    "https://api.spotify.com/v1/browse/featured-playlists?country=IN",
    session
  );

  return { props: { newReleases, featuredPlaylists } };
};
