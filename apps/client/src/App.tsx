import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useState, createContext } from "react";
import { Link } from "react-router"; // Using Link from react-router

export const SearchContext = createContext("");

function App() {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={search}>
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
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to="/metrics">
            <Button>Go to Metrics</Button>
          </Link>
        </div>
      </>
    </SearchContext.Provider>
  );
}

export default App;
