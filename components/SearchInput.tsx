import { useRouter } from "next/router";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { useSpotify } from "../context/SpotifyContext";

export default function SearchInput() {
  const router = useRouter();

  const { query, setQuery } = useSpotify();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(query);
    router.push(`/search/${query}`);
  };

  if (!router.pathname.includes("/search")) {
    return null;
  }

  return (
    <form
      className="flex w-full items-center justify-between gap-3 rounded-full bg-white px-3 py-1.5"
      onSubmit={handleSubmit}
    >
      <IoSearchOutline className="text-2xl text-[#121212]" />

      <input
        className="w-full grow bg-transparent font-semibold text-paper text-sm focus:outline-none"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Artists and songs"
        spellCheck={false}
        type="text"
        value={query}
      />

      {query && (
        <button
          className="flex items-center focus:outline-none"
          onClick={() => setQuery("")}
          type="button"
        >
          <IoCloseOutline className="text-2xl text-[#121212]" />
        </button>
      )}
    </form>
  );
}
