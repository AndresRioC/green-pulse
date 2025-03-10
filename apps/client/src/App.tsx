import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useState, createContext } from "react";

export const SearchContext = createContext("");
const [search, setSearch] = useState("");
const [goToMetrics, setGoToMetrics] = useState(false);

function App() {
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
          <Button type="submit" onClick={}>
            Search
          </Button>
        </div>
      </>
    </SearchContext.Provider>
  );
}

export default App;
