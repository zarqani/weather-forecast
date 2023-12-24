import { getForecast, getHistory } from "@/api/weather";
import { useEffect, useState } from "react";
import Card from "./Card";
import DatePicker from "@/components/common/DatePicker";
import Button from "@/components/common/Button";
import { WeatherProps } from "@/types/weather.types";

export default function Forecast() {
  const [showForecast, setShowForecast] = useState(false);
  const [forecastData, setForecastData] = useState<WeatherProps[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onChange = (dates: [any, any]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const fetchForecastData = async () => {
    try {
      const data = await getForecast();
      setForecastData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHistoryData = async () => {
    try {
      const data = await getHistory({ startDate, endDate } as any);
      setForecastData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, [startDate, endDate]);

  useEffect(() => {
    fetchForecastData();
  }, []);

  console.log({ forecastData });

  return (
    <>
      <div className="w-full flex flex-wrap gap-2 justify-between">
        <h5 className="text-xl font-semibold tracking-wide dark:text-gray-800">
          Daily Weather Forecast
        </h5>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="default"
            label={showForecast ? "Hide Forecast" : "Show Forecast"}
            onClick={() => setShowForecast((prev) => !prev)}
          />
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            selectsDisabledDaysInRange
          />
        </div>
      </div>
      <div className="border-b mt-3 w-full" />
      {showForecast && (
        <ul className="flex flex-wrap gap-5 justify-center mt-8">
          {forecastData.map((item) => (
            <Card data={item} key={item.location} />
          ))}
        </ul>
      )}
    </>
  );
}
