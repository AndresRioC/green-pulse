import { useParams } from "react-router-dom";
import DropdownMetrics from "./CurrentWeather";

function Metrics() {
  const params = useParams();
  console.log({ params });

  return (
    <div>
      <h1>Welcome to {params.city}</h1>
      {/* <DropdownMetrics /> */}
    </div>
  );
}

export default Metrics;
