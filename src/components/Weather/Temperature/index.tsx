export default function Temperature({
  temperature,
  high,
  color,
}: {
  temperature: number;
  high?: boolean;
  color?: string;
}) {
  return (
    <span
      className={
        "after:content-['°'] " +
        (high ? "font-medium " : "") +
        (color ? `text-${color}` : "")
      }
    >
      {temperature}
    </span>
  );
}
