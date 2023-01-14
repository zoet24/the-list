import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

import FilmCard from "../../components/films/FilmCard";

function Fav() {
  const { favFilms } = useContext(AppContext);

  return (
    <div className="films">
      {favFilms.map((film, index) => (
        <FilmCard film={film} key={index} content />
      ))}
    </div>
  );
}
export default Fav;
