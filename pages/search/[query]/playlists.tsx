import { GetServerSideProps } from "next";
import Heading from "../../../components/Heading";
import PlaylistList from "../../../components/PlaylistList";
import { PlaylistType } from "../../../types/types";
import { customGet } from "../../../utils/customGet";

interface SearchPlaylistsProps {
  query: string;
  searchPlaylists: {
    playlists: {
      items: PlaylistType[];
    };
  };
}

export default function SearchPlaylists({
  query,
  searchPlaylists,
}: SearchPlaylistsProps) {
  return (
    <div className="p-4">
      <Heading text={`All playlists for ${query}`} />
      <PlaylistList playlists={searchPlaylists.playlists.items} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.params?.query;
  const searchPlaylists = await customGet(
    `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=playlist&limit=50`,
    ctx
  );
  return { props: { query, searchPlaylists } };
};
