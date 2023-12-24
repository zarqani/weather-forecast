import { getWeather } from "@/api/weather";
import Weather from "@/components/Weather";
import Image from "next/image";

export default async function Home() {
  const weather = await getWeather({ lat: 44.34, lon: 10.99 });

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Weather weather={weather} />
    </main>
  );
}
