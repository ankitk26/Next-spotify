// LEGACY CODE: Spotify has disabled previews, so player track info is commented out
// import Link from "next/link";
// import { IoHeart } from "react-icons/io5";
// import type { Track } from "../types/types";

// interface IProps {
//   currentTrack: Track;
// }

// export default function PlayerTrackInfo({ currentTrack }: IProps) {
//   return (
//     <div className="col-span-3 flex items-center gap-3">
//       {currentTrack.album && (
//         <img
//           alt={currentTrack.name}
//           className="h-14 w-14"
//           src={currentTrack.album.images?.[0].url ?? "/placeholder"}
//         />
//       )}
//       <div className="max-w-full">
//         <h4 className="truncate text-sm">{currentTrack?.name}</h4>
//         <Link href={`/artist/${currentTrack?.artists[0].id}`}>
//           <h5 className="text-gray text-xs">{currentTrack?.artists[0].name}</h5>
//         </Link>
//       </div>
//       <div>
//         <IoHeart className="text-primary text-xl" />
//       </div>
//     </div>
//   );
// }

export default function PlayerTrackInfo() {
  return null;
}
