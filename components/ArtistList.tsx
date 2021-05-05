import { Artist } from "../types/types";
import CardItem from "./CardItem";
import CardItemGrid from "./CardItemGrid";

interface ArtistListProps {
  artists: Artist[];
}

export default function ArtistList({ artists }: ArtistListProps) {
  return (
    <CardItemGrid>
      {artists?.map((artist) => (
        <CardItem
          key={artist.id}
          id={artist.id}
          heading={artist.name}
          images={artist.images}
          altTitle={artist.name}
          subheading="Artist"
          imageRounded
          type="artist"
        />
      ))}
    </CardItemGrid>
  );
}
