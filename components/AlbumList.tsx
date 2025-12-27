import CardItem from "../components/CardItem";
import type { Album } from "../types/types";
import CardItemGrid from "./CardItemGrid";

interface IProps {
  albums: Album[];
}

export default function AlbumList({ albums }: IProps) {
  return (
    <CardItemGrid>
      {albums?.map((album) => (
        <CardItem
          altTitle={album.name}
          heading={album.name}
          id={album.id}
          images={album.images}
          key={album.id}
          subheading={album.artists[0].name}
          type="album"
        />
      ))}
    </CardItemGrid>
  );
}
