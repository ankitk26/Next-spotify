import { GetServerSideProps } from "next";
import AlbumList from "../../components/AlbumList";
import Heading from "../../components/Heading";
import { Album } from "../../types/types";
import { customGet } from "../../utils/customGet";

interface AlbumsProps {
  albums: Album[];
}

export default function Albums({ albums }: AlbumsProps) {
  return (
    <div className="p-4">
      <Heading text="Albums" />
      <AlbumList albums={albums} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { items } = await customGet(
    `https://api.spotify.com/v1/me/albums?market=from_token&limit=50`,
    ctx
  );

  return { props: { albums: items.map((item) => item.album) } };
};
