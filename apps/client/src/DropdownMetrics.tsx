import { useEffect, useState } from "react";
import moment from "moment";
import { getCurrentWeather, fetchHistoricalData } from "./routes/weather-api";
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
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [endDate, setEndDate] = useState("");

  async function currentWeather(location: string) {
    const weatherResponse = await getCurrentWeather(location);
    const weatherData = {
      feels_like: weatherResponse.main.feels_like,
      grnd_level: weatherResponse.main.grnd_level,
      humidity: weatherResponse.main.humidity,
      pressure: weatherResponse.main.pressure,
      sea_level: weatherResponse.main.sea_level,
      temp: weatherResponse.main.temp,
      temp_max: weatherResponse.main.temp_max,
      temp_min: weatherResponse.main.temp_min,
      co: weatherResponse.list[0].components.co,
      nh3: weatherResponse.list[0].components.nh3,
      no: weatherResponse.list[0].components.no,
      no2: weatherResponse.list[0].components.no2,
      o3: weatherResponse.list[0].components.o3,
      pm2_5: weatherResponse.list[0].components.pm2_5,
      pm10: weatherResponse.list[0].components.pm10,
      so2: weatherResponse.list[0].components.so2,
      country: weatherResponse.sys.country,
      name: weatherResponse.name,
    };
    setCurrentMetrics(weatherData);
    setWeatherMetrics(Object.keys(weatherResponse.main));
    setAirMetrics(Object.keys(weatherResponse.list[0].components));
    setLocation(`${weatherResponse.name}, ${weatherResponse.sys.country}`);
    setLat(`${weatherResponse.coord.lat}`);
    setLon(`${weatherResponse.coord.lon}`);
    setEndDate(moment().format("MMMM Do YYYY, h:mm:ss a"));

    return weatherResponse;
  }

  console.log(currentMetrics);

  useEffect(() => {
    if (city) {
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
              lat={lat}
              lon={lon}
            />
          );
        }
        return null; // Don't render if the metric is unchecked
      })}
    </>
  );
}
