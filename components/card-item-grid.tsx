export default function CardItemGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="grid grid-cols-6 gap-6">{children}</div>;
}
