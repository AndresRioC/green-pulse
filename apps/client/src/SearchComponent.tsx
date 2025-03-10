import {} useContext } from "react";
import { SearchContext } from "./SearchContext.tsx";

function SearchComponent() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  return (
    <div>
      <p>{searchTerm}</p>
      <button
        onClick={function () {
          setSearchTerm("Updated Search Term!");
        }}
      >
        Update Search Term
      </button>
    </div>
  );
}

export default SearchComponent;
