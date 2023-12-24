export type WeatherProps = {
  location: string;
  country: string;
  date: number;
  description: string | undefined;
  feels_like: number;
  humidity: number;
  icon: string;
  temperature: number;
  timezone: number;
  wind_speed: number;
  max: number | undefined;
  min: number | undefined;
};

export type WeatherResponseProps = {
  name: string;
  sys: { country: string };
  dt: number;
  weather: { description: string; icon: string }[];
  main: {
    feels_like: number;
    humidity: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  timezone: number;
  wind: { speed: number };
};
