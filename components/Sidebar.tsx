import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IoMdList } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { RiHome5Fill, RiHome5Line } from "react-icons/ri";
import { useSpotify } from "../context/SpotifyContext";

const activeLink = "bg-[#282828] text-white";
const inactiveLink = "bg-transparent text-gray";

export default function Sidebar() {
	const router = useRouter();

	const { playlists, fetchPlaylists } = useSpotify();

	useEffect(() => {
		fetchPlaylists();
	}, []);

	if (router.pathname === "/login") {
		return null;
	}

	return (
		<aside className="fixed top-0 left-0 h-full w-64 bg-black">
			<div className="m-5 mt-5 flex h-full flex-col items-center">
				<Image
					alt="Spotify logo"
					height={50}
					// objectFit="contain"
					src="/images/spotify_logo.png"
					width={125}
				/>

				<ul className="mt-4 w-full">
					<Link href="/">
						<li
							className={`${
								router.pathname === "/" ? activeLink : inactiveLink
							} flex items-center gap-3 rounded p-2 text-sm`}
						>
							{router.pathname === "/" ? (
								<RiHome5Fill className="text-2xl" />
							) : (
								<RiHome5Line className="text-2xl" />
							)}
							<span className="font-bold">Home</span>
						</li>
					</Link>

					<Link href="/search">
						<li
							className={`${
								router.pathname === "/search" ? activeLink : inactiveLink
							} flex cursor-pointer items-center gap-3 rounded p-2 text-sm hover:text-white`}
						>
							<IoSearchOutline className="text-2xl" />

							<span className="font-bold">Search</span>
						</li>
					</Link>

					<Link href="/collection/playlists">
						<li
							className={`${
								router.pathname.includes("/collection") &&
								!router.pathname.includes("tracks")
									? activeLink
									: inactiveLink
							} flex cursor-pointer items-center gap-3 rounded p-2 text-sm hover:text-white`}
						>
							<IoMdList className="text-2xl" />
							<span className="font-bold">Your Library</span>
						</li>
					</Link>

					<Link href="/collection/tracks">
						<li
							className={`${
								router.pathname === "/collection/tracks"
									? "text-white"
									: "text-gray"
							} mt-6 flex cursor-pointer items-center gap-3 rounded p-2 text-sm hover:text-white`}
						>
							<Image
								alt="Liked playlist cover"
								height={28}
								// objectFit="contain"
								src="/images/liked_cover.jpeg"
								width={28}
							/>
							<span className="font-bold">Liked songs</span>
						</li>
					</Link>
				</ul>

				<div className="mt-4 h-px w-full bg-gray" />

				<ul
					className="mt-5 flex w-full flex-col gap-3 overflow-x-hidden pr-3 text-gray text-sm"
					id="sidebar-playlists"
				>
					{playlists?.map((playlist) => (
						<Link href={`/playlist/${playlist.id}`} key={playlist.id}>
							<li
								className="cursor-default truncate font-semibold text-sm hover:text-white"
								key={playlist.id}
							>
								{playlist.name}
							</li>
						</Link>
					))}
				</ul>
			</div>
		</aside>
	);
}
