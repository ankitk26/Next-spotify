import axios from "axios";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { PlaylistType, SearchResults, Track } from "../types/types";

interface ContextProps {
  playlists: PlaylistType[];
  searchResults: SearchResults;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  fetchPlaylists: () => void;
  fetchSearchResults: (query: string) => void;
  currentTrack: Track;
  setCurrentTrack: Dispatch<SetStateAction<Track>>;
  tracksQueue: Track[];
  setTracksQueue: Dispatch<SetStateAction<Track[]>>;
}

const SpotifyContext = createContext<Partial<ContextProps>>(null);

export const SpotifyProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState<PlaylistType[]>(null);
  const [searchResults, setSearchResults] = useState<SearchResults>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [tracksQueue, setTracksQueue] = useState<Track[] | null>(null);
  const [query, setQuery] = useState("");

  const fetchPlaylists = async () => {
    try {
      const resp = await axios.get("/api/playlists");
      const data = resp.data;
      setPlaylists(data.items);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchSearchResults = async () => {
    try {
      const resp = await axios.get(`/api/search?q=${query}`);
      setSearchResults(resp.data);
    } catch (err) {
      console.error(err.message);
    }
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
