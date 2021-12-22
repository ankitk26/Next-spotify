import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSpotify } from "../context/SpotifyContext";

const activeLink = "bg-[#282828] text-white";
const inactiveLink = "bg-transparent text-gray";

export default function Sidebar() {
  const router = useRouter();

  const { playlists, fetchPlaylists } = useSpotify();

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <aside
      className={`h-full col-span-1 bg-black ${
        router.pathname === "/login" ? "hidden" : "block"
      }`}
    >
      <div className="flex flex-col items-center h-full m-5 mt-5">
        <Image
          src="/images/spotify_logo.png"
          width={125}
          height={50}
          objectFit="contain"
          alt="Spotify logo"
        />

        <ul className="w-full mt-4">
          <Link href="/">
            <a>
              <li
                className={`${
                  router.pathname === "/" ? activeLink : inactiveLink
                } flex text-sm items-center gap-3 p-2 rounded`}
              >
                <span className="material-icons">home</span>
                <span className="font-bold">Home</span>
              </li>
            </a>
          </Link>

          <Link href="/search">
            <a>
              <li
                className={`${
                  router.pathname === "/search" ? activeLink : inactiveLink
                } flex items-center gap-3 p-2 text-sm rounded cursor-pointer  hover:text-white`}
              >
                <span className="material-icons">search</span>
                <span className="font-bold">Search</span>
              </li>
            </a>
          </Link>

          <Link href="/collection/playlists">
            <a>
              <li
                className={`${
                  router.pathname.includes("/collection") &&
                  !router.pathname.includes("tracks")
                    ? activeLink
                    : inactiveLink
                } flex items-center gap-3 p-2 text-sm rounded cursor-pointer  hover:text-white`}
              >
                <span className="material-icons">list</span>
                <span className="font-bold">Your Library</span>
              </li>
            </a>
          </Link>

          <Link href="/collection/tracks">
            <a>
              <li
                className={`${
                  router.pathname === "/collection/tracks"
                    ? "text-white"
                    : "text-gray"
                } flex items-center mt-6 gap-3 p-2 text-sm rounded cursor-pointer  hover:text-white`}
              >
                <Image
                  src="/images/liked_cover.jpeg"
                  height={28}
                  width={28}
                  objectFit="contain"
                  alt="Liked playlist cover"
                />
                <span className="font-bold">Liked songs</span>
              </li>
            </a>
          </Link>
        </ul>

        <div className="w-full h-[1px] mt-4 bg-gray"></div>

        <ul className="flex flex-col w-full gap-3 mt-5 text-sm text-gray">
          {playlists?.map((playlist) => (
            <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
              <a className="w-full">
                <li
                  key={playlist.id}
                  className="text-sm font-semibold truncate cursor-default hover:text-white"
                >
                  {playlist.name}
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
}
