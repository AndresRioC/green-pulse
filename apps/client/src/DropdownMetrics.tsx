import { useEffect, useState } from "react";
import { getCurrentWeather } from "./routes/weather-api";
// import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import moment from "moment-timezone";

export default function DropdownMetrics({ city }) {
  const [currentMetrics, setCurrentMetrics] = useState({});
  const [weatherMetrics, setWeatherMetrics] = useState([]);
  const [airMetrics, setAirMetrics] = useState([]);
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function currentWeather(location: string) {
    const weatherResponse = await getCurrentWeather(location);
    setCurrentMetrics(weatherResponse);
    setWeatherMetrics(Object.keys(weatherResponse.main));
    setAirMetrics(Object.keys(weatherResponse.list[0].components));
    setLocation(`${weatherResponse.name}, ${weatherResponse.sys.country}`);
    setLat(`${weatherResponse.coord.lat}`);
    setLon(`${weatherResponse.coord.lon}`);
    setStartDate(roundTime(moment().subtract(50, "years")));
    setEndDate(roundTime(moment()));
    return weatherResponse;
  }

  console.log(startDate, endDate);

  function roundTime(date) {
    const utcDate = moment(date).utc();
    const minutes = utcDate.minutes();
    if (minutes < 30) {
      utcDate.set({ minutes: 0, seconds: 0, milliseconds: 0 });
    } else {
      utcDate.add(1, "hour").set({ minutes: 0, seconds: 0, milliseconds: 0 });
    }
    const localDate = utcDate.local();
    return localDate.toISOString();
  }

  useEffect(() => {
    if (city) {
      currentWeather(city);
    }
  }, [city]);

  // if (currentMetrics === null) return <p>Loading...</p>;

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleCheckedChange = (metric: string) => {
    setCheckedItems((prevCheckedItems) => {
      console.log("Previous state:", prevCheckedItems);
      // Step 1: Copy the previous state
      const updatedCheckedItems = { ...prevCheckedItems };
      // Step 2: Determine current state of the checkbox
      const isCurrentlyChecked = updatedCheckedItems[metric] || false;
      console.log(
        `Metric: ${metric}, Previously checked: ${isCurrentlyChecked}`
      );
      // Step 3: Toggle the checkbox state
      updatedCheckedItems[metric] = !isCurrentlyChecked;
      console.log(
        `Metric: ${metric}, Now checked: ${updatedCheckedItems[metric]}`
      );
      // Step 4: Return the updated state
      return updatedCheckedItems;
    });
  };

  return (
    <>
      <h2>{location}</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Metrics</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="w-56">
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
    </>
  );
}
