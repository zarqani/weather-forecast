// "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=471c4c3590f5e456c7bb92f0bdae9bca"
const baseUrl = "https://api.openweathermap.org/";
const apiKey = "471c4c3590f5e456c7bb92f0bdae9bca";
const endpoint = ({ lat, lon }) =>
  `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`;

// import fetch from ".";
const normalizeData = (data) => ({
  location: data.name,
  condition: data.cod,
  country: data.sys.country,
  date: data.dt,
  description: data.weather[0].description,
  feels_like: Math.round(data.main.feels_like),
  humidity: data.main.humidity,
  icon_id: data.weather[0].id,
  sunrise: data.sys.sunrise,
  sunset: data.sys.sunset,
  temperature: Math.round(data.main.temp),
  timezone: data.timezone / 3600, // convert from seconds to hours
  wind_speed: Math.round(data.wind.speed * 3.6), // convert from m/s to km/h
});

export const getWeather = async (params) => {
  return await fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=471c4c3590f5e456c7bb92f0bdae9bca"
    // { url: endpoint(params) }
  )
    .then((res) => res.json())
    .then((data) => normalizeData(data));
};
