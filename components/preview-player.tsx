// LEGACY CODE: Spotify has disabled previews, so player functionality is commented out
// import { usePlayer } from "../context/player-context";
// import AdditionalControllers from "./additional-controllers";
// import MainControllers from "./main-controllers";
// import PlayerTrackInfo from "./player-track-info";

// export default function PreviewPlayer() {
//   const { currentTrack } = usePlayer();

//   if (!currentTrack) {
//     return null;
//   }

//   return (
//     <footer
//       className={`sticky bottom-0 grid grid-cols-12 items-center justify-between gap-12 border-[#272727] bg-player px-5 ${
//         currentTrack ? "border-t py-3" : "border-0 py-0"
//       }`}
//     >
//       <PlayerTrackInfo currentTrack={currentTrack} />
//       <MainControllers />
//       <AdditionalControllers />
//     </footer>
//   );
// }

export default function PreviewPlayer() {
	return null;
}
