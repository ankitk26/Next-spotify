import type { Artist } from "../types/types";
import CardItem from "./CardItem";
import CardItemGrid from "./CardItemGrid";

interface IProps {
  artists: Artist[];
}

export default function ArtistList({ artists }: IProps) {
  return (
    <CardItemGrid>
      {artists?.map((artist) => (
        <CardItem
          altTitle={artist.name}
          heading={artist.name}
          id={artist.id}
          imageRounded
          images={artist.images}
          key={artist.id}
          subheading="Artist"
          type="artist"
        />
      ))}
    </CardItemGrid>
  );
}
