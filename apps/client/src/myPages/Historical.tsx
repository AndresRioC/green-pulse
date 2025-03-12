import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Navigation from "../myComponents/Navigation.tsx";
import { ChartComponent } from "../myComponents/ChartComponent.tsx";
import { getCurrentWeather } from "../routes/weather-api.ts";

function Historical() {
  const params = useParams();
  const city = params.city;
  const location = useLocation();
  const navigate = useNavigate();
  const [currentMetrics, setCurrentMetrics] = useState({});

  async function currentWeather(city: string) {
    const weatherResponse = await getCurrentWeather(city);
    const weatherData = {
      humidity: weatherResponse.main.humidity,
      pressure: weatherResponse.main.pressure,
      temperature: weatherResponse.main.temp,
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

    return weatherResponse;
  }

  useEffect(() => {
    if (city) {
      currentWeather(city);
    }
  }, [city]);

  const queryParams = new URLSearchParams(location.search);
  const selectedMetrics = queryParams.get("metrics")?.split(",") || [];

  // **Force re-render when the URL changes**
  useEffect(() => {
    if (!selectedMetrics.length) {
      // If no metrics are selected, navigate back to metrics selection page
      navigate(`/metrics/${city}`);
    }
  }, [location.search, city, navigate, selectedMetrics.length]);

  return (
    <>
      <Navigation />
      <h1>Historical Climate Data for {city}</h1>
      {selectedMetrics.length > 0 ? (
        selectedMetrics.map((metric) => (
          <ChartComponent
            key={metric}
            metric={metric}
            city={city}
            data={currentMetrics}
          />
        ))
      ) : (
        <p>No metrics selected. Please go back and choose metrics.</p>
      )}
    </>
  );
}

export default Historical;
