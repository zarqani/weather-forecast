import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import WeatherIcon from "../WeatherIcon";
import { WeatherProps } from "@/types/weather.types";
import { getWeather } from "@/api/weather";
dayjs.extend(utc);

export default function WeatherCard({ data, location }: { data: WeatherProps; location: {lat: number; lon: number;} | null; }) {
  const [weather, setWeather] = useState(data || {});
  
  const fetchWeather = async () => {
      const newData = await getWeather({...location});
      setWeather(newData);
  }

  useEffect(() => {
    if(location) fetchWeather();
  }, [location]);
  
  return (
    <>
      <div className="cursor-pointer items-center m-4 px-8 py-5 rounded-xl w-full bg-blue-100">
        <div className="sm">
          <p className="text-2xl font-semibold tracking-wide dark:text-gray-800">
            {weather.location}, {weather.country}
          </p>
          <p className="tracking-wide text-gray-500 dark:text-gray-400">
            {weather.date && dayjs(weather.date).format("dddd")},{" "}
            {weather.date &&
              dayjs
                .utc(weather.date)
                .utcOffset(weather.timezone)
                .format("h:mm A")}
            , {weather.description}
          </p>
        </div>
        <div className="my-8 flex flex-row justify-between text-5xl tracking-wide lg:my-4 lg:text-6xl">
          <span className="mt-6 font-light text-gray-500 dark:text-gray-800 md:mt-10">
            {weather.temperature}&deg;
            <span className="mt-1 flex flex-col text-base font-normal tracking-wide text-gray-500 dark:text-gray-400">
              Feels like {weather.feels_like}&deg;
            </span>{" "}
          </span>
          <div className="mt-4 text-8xl text-indigo-700 dark:text-gray-800 sm:text-9xl">
            <WeatherIcon icon={weather.icon} size={4} />
          </div>
        </div>
        <div className="mt-1 text-indigo-700 dark:text-gray-400">
          <span className="wi wi-strong-wind text-xl"></span>
          <span className="ml-1 mr-2 tracking-wide text-gray-500 dark:text-gray-800">
            {weather.wind_speed}km/s
          </span>
          <span className="wi wi-humidity text-xl"></span>
          <span className="ml-1 tracking-wide text-gray-500 dark:text-gray-800">
            {weather.humidity}% humidity
          </span>
        </div>
      </div>
    </>
  );
}
