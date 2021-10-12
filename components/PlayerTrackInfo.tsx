import { Track } from "../types/types";

interface PlayerTrackInfoProps {
  currentTrack: Track;
}

export default function PlayerTrackInfo({
  currentTrack,
}: PlayerTrackInfoProps) {
  return (
    <div className="flex items-center col-span-3 gap-3">
      {currentTrack.album && (
        <img
          src={currentTrack.album?.images[0].url}
          alt={currentTrack.name}
          className="w-14 h-14"
        />
      )}
      <div>
        <h4 className="text-sm">{currentTrack.name}</h4>
        <h5 className="text-xs text-gray">{currentTrack?.artists[0].name}</h5>
      </div>
      <span className="ml-5 text-xl material-icons text-primary">favorite</span>
    </div>
  );
}
