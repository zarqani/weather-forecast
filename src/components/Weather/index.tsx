"use client";


import { useEffect, useState } from "react";
import Forecast from "./Forecast";
import WeatherCard from "./WeatherCard";
import { WeatherProps } from "@/types/weather.types";

export default function Weather({ weather }: { weather: WeatherProps }) {
  const [location,setLocation] = useState(null);

    useEffect(()=>{
    if (lnavigator && lnavigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ lat, lon });
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  
  return (
    <>
      <WeatherCard data={weather} location={location} />
      <Forecast location={location} />
    </>
  );
}
