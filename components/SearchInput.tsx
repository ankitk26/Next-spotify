import { useRouter } from "next/router";
import { FormEvent } from "react";
import { useSpotify } from "../context/SpotifyContext";

export default function SearchInput() {
  const router = useRouter();

  const { query, setQuery } = useSpotify();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(query);
    router.push(`/search/${query}`);
  };

  return (
    <form
      className={`${
        router.pathname.includes("/search") ? "block" : "hidden"
      } flex items-center justify-between w-full gap-3 px-3 py-[6px] bg-white rounded-full`}
      onSubmit={handleSubmit}
    >
      <span className="text-gray material-icons">search</span>
      <input
        type="text"
        className="flex-grow w-full bg-transparent text-paper focus:outline-none"
        placeholder="Artists and songs"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="button"
        className="focus:outline-none"
        onClick={() => setQuery("")}
      >
        <span
          className={`${
            query !== "" ? "block" : "hidden"
          } text-gray material-icons hover:text-paper`}
        >
          close
        </span>
      </button>
    </form>
  );
}
