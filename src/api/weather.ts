import { WeatherProps, WeatherResponseProps } from "@/types/weather.types";
import dayjs from "dayjs";

type Params = {
  url?: string;
  lat?: number;
  lon?: number;
  startDate?: number;
  endDate?: number;
};

const baseUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = "471c4c3590f5e456c7bb92f0bdae9bca";
const endpoint = ({ url, lat, lon }: Params): string =>
  `${baseUrl}${url || ""}?lat=${lat || 44.34}&lon=${
    lon || 10.99
  }&appid=${apiKey}&units=metric`;

const normalizeData = (data: WeatherResponseProps): WeatherProps => {
  const weather = {
    location: data.name,
    country: data.sys.country,
    date: data.dt,
    feels_like: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    icon: data.weather[0].icon,
    temperature: Math.round(data.main.temp),
    timezone: data.timezone / 3600, // convert from seconds to hours
    wind_speed: Math.round(data.wind.speed * 3.6), // convert from m/s to km/h
    description: data.weather[0].description
      ? data.weather[0].description.charAt(0).toUpperCase() +
        data.weather[0].description.slice(1)
      : undefined,
    max: data.main.temp_max ? Math.round(data.main.temp_max) : undefined,
    min: data.main.temp_min ? Math.round(data.main.temp_min) : undefined,
  };
  // remove undefined fields
  Object.entries(weather).map(
    ([key, value]) =>
      value === undefined && delete weather[key as keyof WeatherProps]
  );

  return weather;
};

export const getWeather = async (params?: Params): Promise<WeatherProps> => {
  return await fetch(endpoint({ url: "weather", ...params }))
    .then((res) => res.json())
    .then((data) => normalizeData(data));
};

export const getForecast = async (params?: Params): Promise<WeatherProps[]> => {
  return await fetch(endpoint({ url: "forecast", ...params }))
    .then((res) => res.json())
    .then((data) =>
      data.list
        .slice(0, 7)
        ?.map((item: WeatherResponseProps) =>
          normalizeData({ ...item, ...data.city })
        )
    );
};

// `
// https://history.openweathermap.org/data/2.5/history/city?lat=40.4637&lon=-3.7492&type=hour&start=${dayjs(
//   startDate
// ).unix()}&end=${dayjs(
//   endDate
// ).unix()}&appid=471c4c3590f5e456c7bb92f0bdae9bca&units=metric
// `

export const getHistory = async ({
  startDate,
  endDate,
  ...params
}: Params): Promise<WeatherProps[]> => {
  return await fetch(
    endpoint({
      url: "onecall/timemachine",
      startDate: dayjs(startDate).unix(),
      ...params,
    })
  )
    .then((res) => res.json())
    .then((data) => {
      const filteredHistory = data.list.filter(
        (day: WeatherResponseProps) =>
          day.dt >= dayjs(startDate).unix() && day.dt <= dayjs(endDate).unix()
      );
      return filteredHistory?.map((item: WeatherResponseProps) =>
        normalizeData({ ...item, ...data.city, cod: data.cod })
      );
    });
};
