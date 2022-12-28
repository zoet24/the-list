import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

import FilmCard from "../../components/films/FilmCard";

function Search() {
  const { films } = useContext(AppContext);

  return (
    <div className="films">
      {films.map((film, index) => (
        <FilmCard film={film} key={index} />
      ))}
    </div>
  );
}
export default Search;
