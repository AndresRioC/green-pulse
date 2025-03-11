import { useParams } from "react-router";
import DropdownMetrics from "./DropdownMetrics";
import Navigation from "./Navigation.tsx";

function Metrics() {
  const params = useParams();
  const city = params.city;

  return (
    <>
      <Navigation />
      <h1>Select your climate metrics</h1>
      <DropdownMetrics city={city} />
    </>
  );
}

export default Metrics;
