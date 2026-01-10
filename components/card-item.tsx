import Link from "next/link";
import { useRef } from "react";
import { RiMusic2Fill } from "react-icons/ri";

interface IProps {
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
	subheading = "",
	imageRounded = false,
	type
}: IProps) {
	const thumbnailRef = useRef<HTMLImageElement>(null);

	if (type === "genre") {
		return (
			<div className="cursor-pointer rounded bg-paper p-4 transition duration-300 hover:bg-[#282828]">
				{images.length > 0 ? (
					<img
						alt={altTitle}
						className={`h-36 w-full object-cover ${
							imageRounded ? "rounded-full" : "rounded"
						}`}
						ref={thumbnailRef}
						src={images[0].url}
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
			<div className="cursor-pointer rounded bg-paper p-4 transition duration-300 hover:bg-[#282828]">
				{images.length > 0 ? (
					<img
						alt={altTitle}
						className={`h-36 w-full object-cover ${
							imageRounded ? "rounded-full" : "rounded"
						}`}
						ref={thumbnailRef}
						src={images[0].url}
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
		</Link>
	);
}
