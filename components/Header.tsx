import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { MySession } from "../types/types";
import CollectionTabs from "./CollectionTabs";
import SearchInput from "./SearchInput";

export default function Header() {
  const router = useRouter();
  const [session]: [MySession, Boolean] = useSession();

  const logout = () => {
    signOut({ callbackUrl: "http://localhost:3000" });
  };

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between w-full p-4 pl-10 bg-[#111011] ${
        router.pathname === "/login" ? "hidden" : "block"
      }`}
    >
      <div className="flex items-center gap-10 w-[32rem]">
        <div className="flex items-center gap-3">
          <button
            className="flex items-center p-1 bg-[#0B0B0A] rounded-full focus:outline-none"
            onClick={() => router.back()}
          >
            <span className="text-gray material-icons">navigate_before</span>
          </button>

          <button className="flex items-center p-1 bg-[#0B0B0A] rounded-full focus:outline-none">
            <span className="text-gray material-icons">navigate_next</span>
          </button>
        </div>

        <SearchInput />

        {router.pathname.includes("/collection") &&
          router.pathname !== "/collection/tracks" && <CollectionTabs />}
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 pl-[2px] pr-4 bg-black rounded-full bg-opacity-70 py-[2px]">
          {session?.user.picture === undefined ? (
            <span className="p-1 rounded-full bg-[#333333] material-icons">
              person
            </span>
          ) : (
            <img
              src={session?.user.picture}
              className="object-contain w-8 h-8 rounded-full"
              alt={session?.user.name}
            />
          )}
          <span className="text-sm font-bold tracking-wide">
            {session?.user.name}
          </span>
        </div>

        <div>
          <button
            className="flex items-center justify-center bg-black bg-opacity-70 rounded-full h-10 w-10 hover:bg-[#181818] focus:outline-none cursor-pointer"
            onClick={logout}
          >
            <span className="material-icons">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
