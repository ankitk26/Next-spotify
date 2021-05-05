import { GetServerSideProps } from "next";
import Heading from "../../components/Heading";
import PlaylistList from "../../components/PlaylistList";
import { PlaylistType } from "../../types/types";
import { customGet } from "../../utils/customGet";

interface CategoryPlaylistsProps {
  categoryName?: string;
  playlists: {
    items: PlaylistType[];
  };
}

export default function CategoryPlaylists({
  categoryName,
  playlists,
}: CategoryPlaylistsProps) {
  return (
    <div className="p-4">
      <Heading text={categoryName} className="capitalize" />
      <PlaylistList playlists={playlists?.items} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const categoryId = ctx.params?.category;

  const playlists = await customGet(
    `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?country=IN&limit=50`,
    ctx
  );

  const categoryName = categoryId.toString().split("_").join(" ");

  return { props: { categoryName, playlists: playlists.playlists } };
};
