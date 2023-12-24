import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
dayjs.extend(utc);

export default function WeatherCard({ data }) {
  let weather = data || {};
  //   const [weather, setWeather] = useState({});
  // const isMetric = units.match(/metric/i);

  // const { weather, isLoading, isError } = useWeather(
  //   'weather',
  //   location,
  //   units,
  // );
  //   const fetchWeatherData = async ({weather}) => {
  //     try {
  //       data = await fetch(
  //         "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=471c4c3590f5e456c7bb92f0bdae9bca"
  //         // "https://api.openweathermap.org/data/2.5/weather?q=Dreieich,Hessen&appid=fd1bf41dec28f1cdc0bc9eba7ee28111&units=metric"
  //       ).then((res) => res.json());
  //       console.log(data);
  //       if (data)
  //         setWeather({
  //           location: data.name,
  //           condition: data.cod,
  //           country: data.sys.country,
  //           date: data.dt,
  //           description: data.weather[0].description,
  //           feels_like: Math.round(data.main.feels_like),
  //           humidity: data.main.humidity,
  //           icon_id: data.weather[0].id,
  //           sunrise: data.sys.sunrise,
  //           sunset: data.sys.sunset,
  //           temperature: Math.round(data.main.temp),
  //           timezone: data.timezone / 3600, // convert from seconds to hours
  //           wind_speed: Math.round(data.wind.speed * 3.6), // convert from m/s to km/h
  //         });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchWeatherData();
  //   }, []);

  console.log({ weather });

  return (
    <>
      <div className="m-4 w-full">
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
            <span className={weather.weatherIcon}></span>
          </div>
        </div>
        <div className="mt-1 text-indigo-700 dark:text-gray-400">
          <span className="wi wi-strong-wind text-xl"></span>
          <span className="ml-1 mr-2 tracking-wide text-gray-500 dark:text-gray-800">
            {weather.wind_speed}
            {/* {isMetric ? `m/s` : `mph`} winds */}
          </span>
          <span className="wi wi-humidity text-xl"></span>
          <span className="ml-1 tracking-wide text-gray-500 dark:text-gray-800">
            {weather.humidity}% humidity
          </span>
        </div>
        <div className="mt-10 mb-4 text-center text-2xl tracking-wide text-gray-500 dark:text-gray-800">
          {weather.weatherRecommendation}
        </div>
      </div>
    </>
  );
}

// import CloudSvg from "@/components/svg/weather/cloud.vue";
// import SunSvg from "@/components/svg/weather/sun.vue";
// import RainSvg from "@/components/svg/weather/rain.vue";
// import SnowSvg from "@/components/svg/weather/snow.vue";
// import ThunderSvg from "@/components/svg/weather/thunderstorm.vue";

// export default {
//   name: "WeatherMixin",

//   components: {
//     CloudSvg,
//     SunSvg,
//     RainSvg,
//     SnowSvg,
//     ThunderSvg,
//   },

//   methods: {
//     isThunderstorm(id) {
//       return id > 199 && id < 233;
//     },
//     isDrizzle(id) {
//       return id > 299 && id < 322;
//     },
//     isRain(id) {
//       return id > 499 && id < 532;
//     },
//     isSnow(id) {
//       return id > 599 && id < 623;
//     },
//     isClearSky(id) {
//       return id === 800;
//     },
//     getWeatherIcon(id) {

//       if (this.isThunderstorm(id)) {
//         return ThunderstormSvg;
//       }

//       if (this.isDrizzle(id) || this.isRain(id)) {
//         return RainSvg;
//       }

//       if (this.isSnow(id)) {
//         return SnowSvg;
//       }

//       if (this.isClearSky(id)) {
//         return SunSvg;
//       }

//       return CloudSvg;
//     },
//     roundTemperature(temp) {
//       return Math.round(temp);
//     },
//   }
// }
