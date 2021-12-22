import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Layout from "../../components/Layout";
import TracksTable from "../../components/TracksTable";
import { Album } from "../../types/types";
import { customGet } from "../../utils/customGet";
import { isAuthenticated } from "../../utils/isAuthenticated";

interface IProps {
  album: Album;
}

export default function SingleAlbum({ album }: IProps) {
  return (
    <Layout title={`Spotify - ${album?.name}`}>
      <div className="flex items-end gap-6 p-4">
        {album && (
          <>
            {album.images.length > 0 ? (
              <img
                src={album.images[0].url}
                alt={album.name}
                className="object-contain w-52 h-52"
              />
            ) : (
              <span className="flex items-center justify-center w-52 h-52 bg-paper text-9xl material-icons">
                audiotrack
              </span>
            )}
            <div className="flex flex-col gap-3">
              <h5 className="text-xs font-bold uppercase">
                {album.album_type}
              </h5>
              <h2 className="text-5xl font-bold">{album.name}</h2>

              <div className="flex items-center gap-5 text-sm">
                <span className="font-bold">{album.artists[0].name}</span>
                <span>{album.release_date}</span>
                {album.tracks.items.length > 0 && (
                  <span className="text-gray">{album.tracks.total} songs</span>
                )}{" "}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-4">
        <TracksTable tracks={album?.tracks.items} noAlbum />
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

  const albumId = ctx.params.albumId;
  const album = await customGet(
    `https://api.spotify.com/v1/albums/${albumId}`,
    session
  );
  return { props: { album } };
};
