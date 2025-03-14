import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
// import { fetchHistoricalData } from "./routes/weather-api";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState, useEffect } from "react";
import MockData from "./MockData.ts";
// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartComponent({ metric, data, city }) {
  const [historicalData, setHistoricalData] = useState([]);
  useEffect(() => {
    setHistoricalData(MockData[city][metric]);
  }, [metric, city]);

  // async function historyWeather(endDate, metric, lat, lon) {
  //   const weatherResponse = await fetchHistoricalData(
  //     endDate,
  //     metric,
  //     lat,
  //     lon
  //   );
  //   setHistoricalData(weatherResponse);
  // }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{metric}</CardTitle>
        <CardDescription>
          The current {metric} is {data[metric]}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={historicalData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(tick) => `${tick}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="value"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none"></div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              2020 to 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
