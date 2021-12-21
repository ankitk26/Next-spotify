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

export const SpotifyProvider = ({ children }: any) => {
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [tracksQueue, setTracksQueue] = useState<Track[]>([]);
  const [query, setQuery] = useState("");

  const fetchPlaylists = async () => {
    try {
      const resp = await axios.get("/api/playlists");
      const data = resp.data;
      setPlaylists(data.items);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSearchResults = async () => {
    try {
      const resp = await axios.get(`/api/search?q=${query}`);
      setSearchResults(resp.data);
    } catch (err) {
      console.error(err);
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
