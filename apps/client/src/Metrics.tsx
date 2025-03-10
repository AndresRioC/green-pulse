import { useParams } from "react-router";
import DropdownMetrics from "./CurrentWeather";

function Metrics() {
  const params = useParams();
  const city = params.city;

  return (
    <div>
      <h1>Welcome to {city}</h1>
      <DropdownMetrics city={city} />
    </div>
  );
}

export default Metrics;
