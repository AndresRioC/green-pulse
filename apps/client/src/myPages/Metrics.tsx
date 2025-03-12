import { useParams } from "react-router";
import Navigation from "../myComponents/Navigation.tsx";
import { CheckboxMetrics } from "../myComponents/CheckboxMetrics.tsx";

function Metrics() {
  const params = useParams();
  const city = params.city;

  return (
    <>
      <Navigation />
      <CheckboxMetrics city={city} />
    </>
  );
}

export default Metrics;
