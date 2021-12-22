import Link from "next/link";
import { Track } from "../types/types";

interface IProps {
  currentTrack: Track;
}

export default function PlayerTrackInfo({ currentTrack }: IProps) {
  return (
    <div className="flex items-center col-span-3 gap-3">
      {currentTrack.album && (
        <img
          src={currentTrack.album.images?.[0].url}
          alt={currentTrack.name}
          className="w-14 h-14"
        />
      )}
      <div>
        <h4 className="text-sm">{currentTrack?.name}</h4>
        <Link href={`/artist/${currentTrack?.artists[0].id}`}>
          <a>
            <h5 className="text-xs text-gray">
              {currentTrack?.artists[0].name}
            </h5>
          </a>
        </Link>
      </div>
      <span className="ml-5 text-xl material-icons text-primary">favorite</span>
    </div>
  );
}
