import { GetServerSideProps } from "next";
import Link from "next/link";
import CardItem from "../../components/CardItem";
import CardItemGrid from "../../components/CardItemGrid";
import Heading from "../../components/Heading";
import { useSpotify } from "../../context/SpotifyContext";
import { PlaylistType } from "../../types/types";
import { customGet } from "../../utils/customGet";

interface UserPlaylistsProps {
  likedTracks: PlaylistType;
}

export default function UserPlaylists({ likedTracks }: UserPlaylistsProps) {
  const { playlists } = useSpotify();

  return (
    <div className="p-4">
      <Heading text="Playlists" />
      <CardItemGrid>
        <Link href="/collection/tracks">
          <div
            className="flex flex-col items-start justify-end col-span-4 gap-8 p-4 rounded cursor-pointer"
            style={{
              background: "linear-gradient(149.46deg,#450af5,#8e8ee5 99.16%)",
            }}
          >
            <div className="inline">
              {likedTracks?.items.map(({ track }) => (
                <span key={track.id} className="mr-3">
                  <span>{track.artists[0].name}</span>{" "}
                  <span className="text-white opacity-70">{track.name}</span>
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-bold">Liked songs</h1>
          </div>
        </Link>

        {playlists?.map((playlist) => (
          <CardItem
            key={playlist.id}
            heading={playlist.name}
            id={playlist.id}
            images={playlist.images}
            altTitle={playlist.name}
            subheading={playlist.description}
            type="playlist"
          />
        ))}
      </CardItemGrid>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const likedTracks = await customGet(
    `https://api.spotify.com/v1/me/tracks?market=from_token&limit=5`,
    ctx
  );

  return { props: { likedTracks } };
};
