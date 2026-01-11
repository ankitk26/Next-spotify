import type { Playlist } from "@/types/types";
import CardItem from "./card-item";
import CardItemGrid from "./card-item-grid";

interface IProps {
	playlists: Playlist[];
}

export default function PlaylistList({ playlists }: IProps) {
	return (
		<CardItemGrid>
			{playlists?.map((playlist) => {
				if (!playlist) {
					return null;
				}

				return (
					<CardItem
						altTitle={playlist.name}
						heading={playlist.name}
						id={playlist.id}
						images={playlist.images}
						key={playlist.id}
						subheading={playlist.description}
						type="playlist"
					/>
				);
			})}
		</CardItemGrid>
	);
}
