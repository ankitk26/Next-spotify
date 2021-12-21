import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import AlbumList from "../../components/AlbumList";
import Heading from "../../components/Heading";
import { Album } from "../../types/types";
import { customGet } from "../../utils/customGet";
import { isAuthenticated } from "../../utils/isAuthenticated";

interface IProps {
  albums: Album[];
}

export default function Albums({ albums }: IProps) {
  return (
    <div className="p-4">
      <Heading text="Albums" />
      <AlbumList albums={albums} />
    </div>
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

  const { items } = await customGet(
    `https://api.spotify.com/v1/me/albums?market=from_token&limit=50`,
    session
  );

  return { props: { albums: items.map((item) => item.album) } };
};
