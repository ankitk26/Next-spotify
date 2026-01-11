import Image from "next/image";
import Link from "next/link";
import { RiMusic2Fill } from "react-icons/ri";
import type { SpotifyImage } from "@/types/types";

interface IProps {
	images: SpotifyImage[] | undefined;
	id: string;
	altTitle: string;
	heading: string;
	subheading?: string;
	imageRounded?: boolean;
	type: "genre" | "artist" | "album" | "playlist";
}

export default function CardItem({
	images,
	id,
	altTitle,
	heading,
	subheading = "",
	imageRounded = false,
	type,
}: IProps) {
	if (type === "genre") {
		return (
			<div className="cursor-pointer rounded bg-paper p-4 transition duration-300 hover:bg-card-hover">
				{images && images.length > 0 ? (
					<Image
						alt={altTitle}
						className={`h-36 w-full object-cover ${
							imageRounded ? "rounded-full" : "rounded"
						}`}
						height={144}
						src={images[0].url ?? ""}
						width={144}
					/>
				) : (
					<div className="h-40 w-full">
						<RiMusic2Fill className="h-full w-full bg-paper" />
					</div>
				)}
				<h3 className="mt-5 truncate font-bold">{heading}</h3>
				{subheading && (
					<h6 className="truncate text-gray text-sm">{subheading}</h6>
				)}
			</div>
		);
	}

	return (
		<Link href={`/${type}/${id}`} passHref>
			<div className="cursor-pointer rounded bg-paper p-4 transition duration-300 hover:bg-card-hover">
				{images && images.length > 0 ? (
					<Image
						alt={altTitle}
						className={`h-36 w-full object-cover ${
							imageRounded ? "rounded-full" : "rounded"
						}`}
						height={144}
						src={images[0].url ?? ""}
						width={144}
					/>
				) : (
					<div className="flex h-36 w-full items-center justify-center">
						<RiMusic2Fill className="size-36 bg-paper p-2" />
					</div>
				)}
				<h3 className="mt-5 truncate font-bold">{heading}</h3>
				{subheading && (
					<h6 className="truncate text-gray text-sm">{subheading}</h6>
				)}
			</div>
		</Link>
	);
}
