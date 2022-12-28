import React, { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import AppContext from "../../context/AppContext";

function SearchBar() {
  const { query, setQuery } = useContext(AppContext);

  return (
    <div className="searchbar relative">
      <input
        placeholder="Type to search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <div className="icon icon--black">
        <AiOutlineSearch />
      </div>
    </div>
  );
}
export default SearchBar;
