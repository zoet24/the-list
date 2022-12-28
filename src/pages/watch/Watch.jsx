import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

import FilmCardSimple from "../../components/films/FilmCardSimple";

function Watch() {
  const { watchFilms } = useContext(AppContext);

  return (
    <div className="films">
      {watchFilms.map((film, index) => (
        <FilmCardSimple film={film} key={index} />
      ))}
    </div>
  );
}
export default Watch;
