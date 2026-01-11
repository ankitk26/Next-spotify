import Image from "next/image";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { AiOutlineUser } from "react-icons/ai";
import { MdLogout, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
// LEGACY CODE: useSpotify setCurrentTrack commented out - Spotify has disabled previews
// import { useSpotify } from "@/context/spotify-context";
import type { MySession } from "@/types/types";
import CollectionTabs from "./collection-tabs";
import SearchInput from "./search-input";

interface UseSession {
	data: MySession | null;
}

export default function Header() {
	const router = useRouter();
	const { data: session }: UseSession = useSession();
	// LEGACY CODE: setCurrentTrack commented out - Spotify has disabled previews
	// const { setCurrentTrack } = useSpotify();

	const logout = () => {
		// LEGACY CODE: setCurrentTrack(null); - Spotify has disabled previews
		signOut({ callbackUrl: "/login" });
	};

	if (router.pathname === "/login") {
		return null;
	}

	return (
		<header className="sticky top-0 z-50 flex w-full items-center justify-between bg-header-bg p-4 pl-10">
			<div className="flex w-lg items-center gap-10">
				<div className="flex items-center gap-3">
					<button
						className="flex items-center rounded-full bg-button-bg p-1 focus:outline-none"
						onClick={() => router.back()}
						type="button"
					>
						<MdNavigateBefore className="text-2xl text-gray" />
					</button>

					<button
						className="flex items-center rounded-full bg-button-bg p-1 focus:outline-none"
						onClick={() => router.forward()}
						type="button"
					>
						<MdNavigateNext className="text-2xl text-gray" />
					</button>
				</div>

				<SearchInput />

				{router.pathname.includes("/collection") &&
					router.pathname !== "/collection/tracks" && <CollectionTabs />}
			</div>

			<div className="flex items-center gap-6">
				<div className="flex items-center gap-3 rounded-full bg-black bg-opacity-70 py-2 pr-4 pl-2">
					{session?.user?.picture === undefined ? (
						<AiOutlineUser className="rounded-full bg-user-icon-bg p-1 text-2xl" />
					) : (
						<Image
							alt={session?.user?.name ?? ""}
							className="h-8 w-8 rounded-full object-contain"
							height={32}
							src={session?.user?.picture ?? "/placeholder"}
							width={32}
						/>
					)}
					<span className="font-bold text-sm tracking-wide">
						{session?.user?.name}
					</span>
				</div>

				<div>
					<button
						className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-70 hover:bg-button-hover focus:outline-none"
						onClick={logout}
						type="button"
					>
						<MdLogout />
					</button>
				</div>
			</div>
		</header>
	);
}
