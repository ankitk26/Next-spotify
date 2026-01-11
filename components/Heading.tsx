interface IProps {
	className?: string;
	text: string;
}

export default function Heading({ className, text }: IProps) {
	return (
		<h1 className={`mb-5 inline-block font-bold text-2xl ${className}`}>
			{text}
		</h1>
	);
}
