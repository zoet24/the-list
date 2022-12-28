import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

import FilmCardSimple from "../../components/films/FilmCardSimple";

function Fav() {
  const { favFilms } = useContext(AppContext);

  return (
    <div className="films">
      {favFilms.map((film, index) => (
        <FilmCardSimple film={film} key={index} />
      ))}
    </div>
  );
}
export default Fav;
