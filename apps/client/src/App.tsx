import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import { Link } from "react-router"; // Using Link from react-router

function App() {
  const [city, setCity] = useState("");

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink className="NavigationMenuLink" href="">
              Search
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="NavigationMenuLink" href="">
              Dashboards
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

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
