import { useEffect, useState } from "react";
import moment from "moment";
import { getCurrentWeather } from "../routes/weather-api";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChartComponent } from "./ChartComponent"; // Import your ChartComponent

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function DropdownMetrics({ city }) {
  const [currentMetrics, setCurrentMetrics] = useState({});
  const [weatherMetrics, setWeatherMetrics] = useState([]);
  const [airMetrics, setAirMetrics] = useState([]);
  const [location, setLocation] = useState("");
  const [endDate, setEndDate] = useState("");

  async function currentWeather(location: string) {
    const weatherResponse = await getCurrentWeather(location);
    const weatherData = {
      humidity: weatherResponse.main.humidity,
      pressure: weatherResponse.main.pressure,
      temp: weatherResponse.main.temp,
      co: weatherResponse.list[0].components.co,
      nh3: weatherResponse.list[0].components.nh3,
      no: weatherResponse.list[0].components.no,
      no2: weatherResponse.list[0].components.no2,
      o3: weatherResponse.list[0].components.o3,
      pm2_5: weatherResponse.list[0].components.pm2_5,
      pm10: weatherResponse.list[0].components.pm10,
      so2: weatherResponse.list[0].components.so2,
      country: weatherResponse.sys.country,
      city: weatherResponse.name,
    };
    setCurrentMetrics(weatherData);
    setWeatherMetrics(["humidity", "pressure", "temp"]);
    setAirMetrics(["co", "nh3", "no", "no2", "o3", "pm2_5", "pm10", "so2"]);
    setLocation(`${weatherResponse.name}, ${weatherResponse.sys.country}`);
    setEndDate(moment().format("MMMM Do YYYY, h:mm:ss a"));

    return weatherResponse;
  }

  console.log(currentMetrics);

  useEffect(() => {
    if (city) {
      console.log("current city:", city);
      currentWeather(city);
    }
  }, [city]);

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: Checked }>(
    {}
  );

  const handleCheckedChange = (metric: string) => {
    setCheckedItems((prevCheckedItems) => {
      const isCurrentlyChecked = prevCheckedItems[metric] || false;
      const newChecked: Checked = !isCurrentlyChecked;
      return { ...prevCheckedItems, [metric]: newChecked };
    });
  };

  return (
    <>
      <h2>{location}</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Metrics</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Weather</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {weatherMetrics.map((currentMetric: string) => (
            <DropdownMenuCheckboxItem
              key={currentMetric}
              checked={checkedItems[currentMetric] || false}
              onCheckedChange={() => handleCheckedChange(currentMetric)}
            >
              {currentMetric}
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Air Quality</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {airMetrics.map((currentMetric: string) => (
            <DropdownMenuCheckboxItem
              key={currentMetric}
              checked={checkedItems[currentMetric] || false}
              onCheckedChange={() => handleCheckedChange(currentMetric)}
            >
              {currentMetric}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Render charts based on checked items */}
      {Object.keys(checkedItems).map((metric) => {
        if (checkedItems[metric]) {
          return (
            <ChartComponent
              key={metric}
              metric={metric}
              data={currentMetrics[metric]}
              endDate={endDate}
              city={currentMetrics.city}
              country={currentMetrics.country}
            />
          );
        }
        return null; // Don't render if the metric is unchecked
      })}
    </>
  );
}
