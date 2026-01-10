import Link from "next/link";
import { useRouter } from "next/router";

const collectionTabs = ["playlists", "artists", "albums"];

export default function CollectionTabs() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-8 bg-transparent">
      {collectionTabs.map((tab) => (
        <Link href={`/collection/${tab}`} key={tab}>
          <span
            className={`${
              router.pathname === `/collection/${tab}`
                ? "bg-[#323233]"
                : "bg-transparent"
            } rounded px-6 py-3 font-bold text-sm text-white capitalize`}
          >
            {tab}
          </span>
        </Link>
      ))}
    </div>
  );
}
