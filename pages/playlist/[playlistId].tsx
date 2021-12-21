import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import TracksTable from "../../components/TracksTable";
import { PlaylistType } from "../../types/types";
import { customGet } from "../../utils/customGet";
import { isAuthenticated } from "../../utils/isAuthenticated";

interface IProps {
  playlist: PlaylistType;
}

export default function Playlist({ playlist }: IProps) {
  return (
    <>
      <div className="flex items-end gap-6">
        {playlist && (
          <>
            {playlist.images.length > 0 ? (
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                className="object-contain w-52 h-52"
              />
            ) : (
              <span className="flex items-center justify-center w-52 h-52 bg-paper text-9xl material-icons">
                audiotrack
              </span>
            )}
            <div className="flex flex-col gap-3">
              <h5 className="text-xs font-bold uppercase">{playlist.type}</h5>
              <h2 className="text-5xl font-bold">{playlist.name}</h2>

              <p className="text-sm text-gray">{playlist.description}</p>
              <div className="flex items-center gap-5 text-sm">
                <span className="font-bold">{playlist.owner.display_name}</span>
                {playlist.followers.total > 0 && (
                  <span className="text-gray">
                    {playlist.followers?.total} likes
                  </span>
                )}
                {playlist.tracks.items.length > 0 && (
                  <span className="text-gray">
                    {playlist.tracks.items?.length} songs
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
    </>
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
    `https://api.spotify.com/v1/playlists/${playlistId}?market=from_token&fields=description,id,followers.total,images,name,owner(display_name,id),type,tracks.items(added_at,track(album(id,images,name),artists(id,name),duration_ms,id,name,preview_url))&limit=50`,
    session
  );

  return { props: { playlist } };
};
