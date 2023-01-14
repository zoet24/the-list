import React, { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import AppContext from "../../context/AppContext";

function SearchBar() {
  const { query, watchQuery, setQuery, setWatchQuery } = useContext(AppContext);
  const location = useLocation();

  return (
    <div>
      <div className="searchbar relative">
        {location.pathname === "/" ? (
          <input
            placeholder="Type to search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
        ) : (
          <input
            placeholder="Type to search watch films..."
            value={watchQuery}
            onChange={(e) => setWatchQuery(e.target.value)}
          ></input>
        )}
        <div className="icon icon--black">
          <AiOutlineSearch />
        </div>
      </div>
    </div>
  );
}
export default SearchBar;
