import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import WeatherIcon from "../../WeatherIcon";
import Temperature from "../../Temperature";

dayjs.extend(utc);

export default function Card({ data }) {
  return (
    <li className="flex flex-col items-center py-2 bg-white rounded-lg shadow-lg cursor-pointer min-w-[40vw] h-44 drop-shadow-lg md:min-w-min md:w-44 md:h-52">
      <div className="flex-grow pb-2 text-black text-center">
        {data.date && dayjs(data.date).format("dddd")},{" "}
        {data.date &&
          dayjs.utc(data.date).utcOffset(data.timezone).format("MM/DD")}
        <div>{data.description}</div>
      </div>

      <WeatherIcon icon={data.icon} />
      <div className="flex flex-col items-center justify-center text-slate-700">
        <span>
          <Temperature color="slate-900" temperature={data.min} high /> /{" "}
          <Temperature temperature={data.max} />
        </span>
        <span className="text-xs">
          Feels like{" "}
          <Temperature color="slate-900" high temperature={data.feels_like} />
        </span>
      </div>
    </li>
  );
}
