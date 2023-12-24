"use client";

import WeatherCard from "./WeatherCard";

export default function Weather({ weather }) {
  return (
    <>
      <WeatherCard data={weather} />
    </>
  );
}
