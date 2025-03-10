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

export default function DropdownMetrics({ city }) {
  console.log(city);
  const [currentMetrics, setCurrentMetrics] = useState({});
  const [weatherMetrics, setWeatherMetrics] = useState([]);
  const [airMetrics, setAirMetrics] = useState([]);

  async function currentWeather(location: string) {
    const weatherResponse = await getCurrentWeather(location);
    setCurrentMetrics(weatherResponse);
    setWeatherMetrics(Object.keys(weatherResponse.main));
    setAirMetrics(Object.keys(weatherResponse.list[0].components));
    return weatherResponse;
  }
  console.log(currentWeather(city));

  // useEffect(() => {
  //   if (city) {
  //     currentWeather(city);
  //   }
  // }, [city]);

  if (!currentMetrics) return <p>Loading...</p>;

  // type Checked = DropdownMenuCheckboxItemProps["checked"];

  // const [showStatusBar, setShowStatusBar] = React.useState<Checked>(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Metrics</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Weather</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* {current} */}
        {weatherMetrics.map((currentMetric: string) => (
          <DropdownMenuCheckboxItem
          // checked={showStatusBar}
          // onCheckedChange={setShowStatusBar}
          >
            {currentMetric}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuLabel>Air Quality</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* {current} */}
        {airMetrics.map((currentMetric: string) => (
          <DropdownMenuCheckboxItem
          // checked={showStatusBar}
          // onCheckedChange={setShowStatusBar}
          >
            {currentMetric}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
