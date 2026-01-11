// LEGACY CODE: Spotify has disabled previews, so player functionality is commented out
// import { useEffect, useState } from "react";
// import { useSpotify } from "../context/spotify-context";
// import AdditionalControllers from "./additional-controllers";
// import PlayerTrackInfo from "./player-track-info";

// export default function PlayerTwo() {
//   const { currentTrack } = useSpotify();

//   const [audio, setAudio] = useState<HTMLAudioElement>(new HTMLAudioElement());
//   const [playing, setPlaying] = useState(false);

//   const toggle = () => {
//     setPlaying((prev) => !prev);
//   };

//   useEffect(() => {
//     // if (currentTrack) {
//     setAudio(new Audio(currentTrack?.preview_url));
//     // }
//   }, [currentTrack?.preview_url]);

//   useEffect(() => {
//     playing ? audio?.play() : audio?.pause();
//   }, [playing]);

//   useEffect(() => {
//     if (audio) {
//       audio.addEventListener("ended", () => setPlaying(false));
//     }
//     return () => {
//       audio?.removeEventListener("ended", () => setPlaying(false));
//     };
//   });

//   return (
//     <footer
//       className={`sticky bottom-0 grid grid-cols-12 items-center justify-between border-[#272727] bg-player px-5 ${
//         currentTrack ? "border-t py-3" : "border-0 py-0"
//       }`}
//     >
//       {currentTrack && (
//         <>
//           <PlayerTrackInfo currentTrack={currentTrack} />
//           <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
//           {JSON.stringify(audio, null, 4)}
//           {/* <MainControllers previewUrl={currentTrack.preview_url} /> */}
//           <AdditionalControllers />
//         </>
//       )}
//     </footer>
//   );
// }

export default function PlayerTwo() {
	return null;
}
