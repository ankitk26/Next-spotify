import CardItem from "../components/CardItem";
import { Album } from "../types/types";
import CardItemGrid from "./CardItemGrid";

interface AlbumListProps {
  albums: Album[];
}

export default function AlbumList({ albums }: AlbumListProps) {
  return (
    <CardItemGrid>
      {albums?.map((album) => (
        <CardItem
          key={album.id}
          id={album.id}
          heading={album.name}
          images={album.images}
          altTitle={album.name}
          subheading={album.artists[0].name}
          type="album"
        />
      ))}
    </CardItemGrid>
  );
}

// <Link href={`/album/${album.id}`} key={album.id}>
//   <div className="w-full col-span-2 transition duration-300 p-4 rounded cursor-pointer hover:bg-[#282828] bg-paper">
//     {album.images.length > 0 ? (
//       <img
//         src={album.images[0].url}
//         alt={album.name}
//         className="object-contain w-full rounded-sm"
//       />
//     ) : (
//       <div className="w-full h-40">
//         <span className="flex items-center justify-center w-full h-full rounded bg-paper text-9xl material-icons">
//           audiotrack
//         </span>
//       </div>
//     )}
//     <h3 className="mt-5 font-bold truncate">{album.name}</h3>
//     <h6 className="text-sm font-bold truncate text-gray">
//       {album.artists[0].name}
//     </h6>
//   </div>
// </Link>
