import { GetServerSideProps } from "next";
import AlbumList from "../../../components/AlbumList";
import Heading from "../../../components/Heading";
import { Album } from "../../../types/types";
import { customGet } from "../../../utils/customGet";

interface SearchAlbumsProps {
  query: string;
  searchAlbums: {
    albums: {
      items: Album[];
    };
  };
}

export default function SearchAlbums({
  query,
  searchAlbums,
}: SearchAlbumsProps) {
  return (
    <div className="p-4">
      <Heading text={`All albums for "${query}"`} />
      <AlbumList albums={searchAlbums.albums.items} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.params?.query;
  const searchAlbums = await customGet(
    `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=album&limit=50`,
    ctx
  );
  return { props: { query, searchAlbums } };
};
