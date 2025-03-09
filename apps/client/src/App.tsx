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
import { React, useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [goToMetrics, setGoToMetrics] = useState(false);

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
        <Input type="text" placeholder="Write a location..." />
        <Button type="submit">Search</Button>
      </div>
    </>
  );
}

export default App;
