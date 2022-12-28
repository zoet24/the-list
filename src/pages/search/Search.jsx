import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

import FilmCardSimple from "../../components/films/FilmCardSimple";

function Search() {
  const { films } = useContext(AppContext);

  return (
    <div className="films">
      {films.map((film, index) => (
        <FilmCardSimple film={film} key={index} />
      ))}
    </div>
  );
}
export default Search;
