import { GetServerSideProps } from "next";
import ArtistList from "../../components/ArtistList";
import Heading from "../../components/Heading";
import { Artist } from "../../types/types";
import { customGet } from "../../utils/customGet";

interface FollowedArtistsProps {
  followedArtists: Artist[];
}

export default function FollowedArtists({
  followedArtists,
}: FollowedArtistsProps) {
  return (
    <div className="p-4">
      <Heading text="Artists" />
      <ArtistList artists={followedArtists} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const followedArtists = await customGet(
    `https://api.spotify.com/v1/me/following?type=artist&limit=50`,
    ctx
  );

  return { props: { followedArtists: followedArtists.artists.items } };
};
