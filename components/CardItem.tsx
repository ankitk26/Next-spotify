import Link from "next/link";

interface CardItemProps {
  images: any;
  id: string;
  altTitle: string;
  heading: string;
  subheading?: string;
  imageRounded?: boolean;
  type: string;
}

export default function CardItem({
  images,
  id,
  altTitle,
  heading,
  subheading = null,
  imageRounded = false,
  type,
}: CardItemProps) {
  return (
    <Link href={`/${type}/${id}`}>
      <div className="w-full col-span-2 transition duration-300 p-4 rounded cursor-pointer hover:bg-[#282828] bg-paper">
        {images.length > 0 ? (
          <img
            src={images[0].url}
            alt={altTitle}
            className={`object-cover w-40 h-40 ${
              imageRounded ? "rounded-full" : "rounded"
            }`}
          />
        ) : (
          <div className="w-full h-40">
            <span className="flex items-center justify-center w-full h-full rounded bg-paper text-9xl material-icons">
              audiotrack
            </span>
          </div>
        )}
        <h3 className="mt-5 font-bold truncate">{heading}</h3>
        {subheading && (
          <h6 className="text-sm truncate text-gray">{subheading}</h6>
        )}{" "}
      </div>
    </Link>
  );
}
