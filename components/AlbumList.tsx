import CardItem from "../components/CardItem";
import { Album } from "../types/types";
import CardItemGrid from "./CardItemGrid";

interface AlbumListProps {
  albums: Album[];
}

export default function AlbumList({ albums }: AlbumListProps) {
  return (
    <CardItemGrid>
      {albums?.map((album) => (
        <CardItem
          key={album.id}
          id={album.id}
          heading={album.name}
          images={album.images}
          altTitle={album.name}
          subheading={album.artists[0].name}
          type="album"
        />
      ))}
    </CardItemGrid>
  );
}
