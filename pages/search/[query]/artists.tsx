import { GetServerSideProps } from "next";
import ArtistList from "../../../components/ArtistList";
import Heading from "../../../components/Heading";
import { Artist } from "../../../types/types";
import { customGet } from "../../../utils/customGet";

interface SearchArtistProps {
  query: string;
  searchArtists: {
    artists: {
      items: Artist[];
    };
  };
}

export default function SearchArtists({
  query,
  searchArtists,
}: SearchArtistProps) {
  return (
    <div className="p-4">
      <Heading text={`All artists for "${query}"`} />
      <ArtistList artists={searchArtists.artists.items} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.params?.query;
  const searchArtists = await customGet(
    `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=artist&limit=50`,
    ctx
  );
  return { props: { query, searchArtists } };
};
