import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

import FilmCard from "../../components/films/FilmCard";

function Watch() {
  const { watchFilms } = useContext(AppContext);

  return (
    <div className="films">
      {watchFilms.map((film, index) => (
        <FilmCard film={film} key={index} content />
      ))}
    </div>
  );
}
export default Watch;
