import type { PlaylistType } from "../types/types";
import CardItem from "./CardItem";
import CardItemGrid from "./CardItemGrid";

interface IProps {
  playlists: PlaylistType[];
}

export default function PlaylistList({ playlists }: IProps) {
  return (
    <CardItemGrid>
      {playlists?.map((playlist) => (
        <CardItem
          altTitle={playlist.name}
          heading={playlist.name}
          id={playlist.id}
          images={playlist.images}
          key={playlist.id}
          subheading={playlist.description}
          type="playlist"
        />
      ))}
    </CardItemGrid>
  );
}
