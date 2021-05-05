import { GetServerSideProps } from "next";
import { useSession } from "next-auth/client";
import TracksTable from "../../components/TracksTable";
import { PlaylistType } from "../../types/types";
import { customGet } from "../../utils/customGet";

interface LikedTracksProps {
  likedTracks: PlaylistType;
}

export default function LikedTracks({ likedTracks }: LikedTracksProps) {
  const [session] = useSession();

  return (
    <>
      {likedTracks && (
        <>
          <div className="flex items-end gap-6 p-4">
            <img
              src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
              alt="Liked Songs"
              className="object-contain w-52 h-52"
            />
            <div className="flex flex-col gap-3">
              <h5 className="text-sm font-bold uppercase">Playlist</h5>
              <h2 className="text-5xl font-bold">Liked Songs</h2>

              <div className="flex items-center gap-5 text-sm">
                <span className="font-bold">{session?.user.name}</span>
                {likedTracks.items.length > 0 && (
                  <span className="text-gray">{likedTracks.total} songs</span>
                )}{" "}
              </div>
            </div>
          </div>

          <div className="p-4">
            <TracksTable tracks={likedTracks.items.map((item) => item.track)} />
          </div>
        </>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const likedTracks = await customGet(
    `https://api.spotify.com/v1/me/tracks?market=from_token&limit=50`,
    ctx
  );

  return { props: { likedTracks } };
};
