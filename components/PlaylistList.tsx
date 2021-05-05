import { PlaylistType } from "../types/types";
import CardItem from "./CardItem";
import CardItemGrid from "./CardItemGrid";

interface PlaylistListProps {
  playlists: PlaylistType[];
}

export default function PlaylistList({ playlists }: PlaylistListProps) {
  return (
    <CardItemGrid>
      {playlists?.map((playlist) => (
        <CardItem
          key={playlist.id}
          id={playlist.id}
          heading={playlist.name}
          subheading={playlist.description}
          altTitle={playlist.name}
          images={playlist.images}
          type="playlist"
        />
      ))}
    </CardItemGrid>
  );
}
