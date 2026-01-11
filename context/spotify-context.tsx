import axios from "axios";
import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useContext,
	useState,
} from "react";
import type { Playlist, SearchResults, Track } from "@/types/types";

interface ContextProps {
	playlists: Playlist[];
	searchResults: SearchResults | null;
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
	fetchPlaylists: () => void;
	fetchSearchResults: (query: string) => void;
	currentTrack: Track | null;
	setCurrentTrack: Dispatch<SetStateAction<Track | null>>;
	tracksQueue: Track[];
	setTracksQueue: Dispatch<SetStateAction<Track[]>>;
}

const SpotifyContext = createContext({} as ContextProps);

export const SpotifyProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [playlists, setPlaylists] = useState<Playlist[]>([]);
	const [searchResults, setSearchResults] = useState<SearchResults | null>(
		null
	);
	const [tracksQueue, setTracksQueue] = useState<Track[]>([]);
	const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
	const [query, setQuery] = useState("");

	const fetchPlaylists = async () => {
		const resp = await axios.get<{ items: Playlist[] }>("/api/playlists");
		const data = resp.data;
		setPlaylists(data.items);
	};

	const fetchSearchResults = async () => {
		const resp = await axios.get(`/api/search?q=${query}`);
		setSearchResults(resp.data);
	};

	return (
		<SpotifyContext.Provider
			value={{
				playlists,
				fetchPlaylists,
				query,
				setQuery,
				searchResults,
				fetchSearchResults,
				currentTrack,
				setCurrentTrack,
				tracksQueue,
				setTracksQueue,
			}}
		>
			{children}
		</SpotifyContext.Provider>
	);
};

export const useSpotify = () => useContext(SpotifyContext);
