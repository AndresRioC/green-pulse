import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router"; // Using Link from react-router
import Navigation from "./Navigation.tsx";

function App() {
  const [city, setCity] = useState("");

  return (
    <>
      <Navigation />
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Write a location..."
          onChange={(e) => setCity(e.target.value.toLowerCase())}
        />
        <Link to={`/metrics/${city}`}>
          <Button>Search</Button>
        </Link>
      </div>
    </>
  );
}

export default App;
