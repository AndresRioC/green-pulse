import React, { useState } from "react";

export const SearchContext = React.createContext("");

function SearchProvider(props) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {props.children}
    </SearchContext.Provider>
  );
}

export { SearchProvider };
