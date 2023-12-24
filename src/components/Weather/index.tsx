"use client";

import Forecast from "./Forecast";
import WeatherCard from "./WeatherCard";
import { WeatherProps } from "@/types/weather.types";

export default function Weather({ weather }: { weather: WeatherProps }) {
  return (
    <>
      <WeatherCard data={weather} />
      <Forecast />
    </>
  );
}
