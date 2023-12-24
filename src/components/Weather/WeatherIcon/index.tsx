export default function WeatherIcon({
  icon,
  size,
}: {
  icon: string;
  size?: number;
}) {
  return (
    <div>
      <img
        src={`https://openweathermap.org/img/wn/${icon || "10d"}@${
          size || 2
        }x.png`}
      />
    </div>
  );
}
