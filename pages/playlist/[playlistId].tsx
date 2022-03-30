import parse from "html-react-parser";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { RiMusic2Fill } from "react-icons/ri";
import Layout from "../../components/Layout";
import TracksTable from "../../components/TracksTable";
import styles from "../../styles/Description.module.css";
import { PlaylistType } from "../../types/types";
import { customGet } from "../../utils/customGet";
import { isAuthenticated } from "../../utils/isAuthenticated";

interface IProps {
  playlist: PlaylistType;
}

export default function Playlist({ playlist }: IProps) {
  return (
    <Layout title={`Spotify - ${playlist?.name}`}>
      <div className="flex items-end gap-6">
        {playlist && (
          <>
            {playlist.images.length > 0 ? (
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                className="object-contain w-60 h-60 "
              />
            ) : (
              <div className="w-full h-40">
                <RiMusic2Fill className="w-full h-full bg-paper " />
              </div>
            )}
            <div className="flex flex-col gap-3">
              <h5 className="text-xs font-bold uppercase">{playlist.type}</h5>
              <h2 className="text-5xl font-bold">{playlist.name}</h2>

              <p className={styles.description}>
                {parse(playlist.description)}
              </p>

              <div className="flex items-center gap-5 text-sm">
                <span className="font-bold">{playlist.owner.display_name}</span>
                {playlist.followers.total > 0 && (
                  <span className="text-gray">
                    {playlist.followers.total.toLocaleString()}{" "}
                    {playlist.followers.total > 1 ? "likes" : "like"}
                  </span>
                )}
                {playlist.tracks.items.length > 0 && (
                  <span className="text-gray">
                    {playlist.tracks.total.toLocaleString()} songs
                  </span>
                )}{" "}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-5">
        <TracksTable
          tracks={playlist?.tracks.items
            .filter((item) => item.track !== null)
            .map((item) => item.track)}
        />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!(await isAuthenticated(session))) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const playlistId = ctx.params.playlistId;
  const playlist = await customGet(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    session
  );

  return { props: { playlist } };
};
