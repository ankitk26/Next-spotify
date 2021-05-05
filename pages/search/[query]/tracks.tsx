import { GetServerSideProps } from "next";
import Heading from "../../../components/Heading";
import TracksTable from "../../../components/TracksTable";
import { Track } from "../../../types/types";
import { customGet } from "../../../utils/customGet";

interface SearchTracksProps {
  query: string;
  searchTracks: {
    tracks: {
      items: Track[];
    };
  };
}

export default function SearchTracks({
  query,
  searchTracks,
}: SearchTracksProps) {
  return (
    <div className="p-4">
      <Heading text={`All songs for ${query}`} />
      <TracksTable tracks={searchTracks?.tracks.items} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.params?.query;
  const searchTracks = await customGet(
    `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=track&limit=50`,
    ctx
  );
  return { props: { query, searchTracks } };
};
