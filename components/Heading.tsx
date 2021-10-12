interface HeadingProps {
  className?: string;
  text: string;
}

export default function Heading({ className, text }: HeadingProps) {
  return (
    <h1 className={`text-2xl inline-block font-bold  mb-5 ${className}`}>
      {text}
    </h1>
  );
}
