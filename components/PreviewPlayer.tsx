import { useSpotify } from "../context/SpotifyContext";
import AdditionalControllers from "./AdditionalControllers";
import MainControllers from "./MainControllers";
import PlayerTrackInfo from "./PlayerTrackInfo";

export default function PreviewPlayer() {
  const { currentTrack } = useSpotify();

  return (
    <footer
      className={`sticky bottom-0 grid grid-cols-12 items-center justify-between px-5 border-[#272727] bg-player ${
        currentTrack ? "py-3 border-t" : "py-0 border-0"
      }`}
    >
      {currentTrack && (
        <>
          <PlayerTrackInfo currentTrack={currentTrack} />
          <MainControllers previewUrl={currentTrack.preview_url} />
          <AdditionalControllers />
        </>
      )}
    </footer>
  );
}
