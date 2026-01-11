import axios from "axios";
import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useContext,
	useState,
} from "react";
import type { Playlist } from "@/types/types";

interface ContextProps {
	playlists: Playlist[];
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
	fetchPlaylists: () => void;
}

const SpotifyContext = createContext({} as ContextProps);

export const SpotifyProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [playlists, setPlaylists] = useState<Playlist[]>([]);
	const [query, setQuery] = useState("");

	const fetchPlaylists = async () => {
		const response = await axios.get<{ items: Playlist[] }>("/api/playlists");
		const data = response.data;
		setPlaylists(data.items);
	};

	return (
		<SpotifyContext.Provider
			value={{
				playlists,
				fetchPlaylists,
				query,
				setQuery,
			}}
		>
			{children}
		</SpotifyContext.Provider>
	);
};

export const useSpotify = () => useContext(SpotifyContext);
