import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";

import FilmCard from "../../components/films/FilmCard";

function Watch() {
  const [results, setResults] = useState([]);
  const { watchFilms, watchQuery } = useContext(AppContext);

  const searchWatchFilms = (query, films) => {
    return films.filter((film) => {
      return (
        film.Title.toLowerCase().includes(query.toLowerCase()) ||
        film.Director.toLowerCase().includes(query.toLowerCase()) ||
        film.Actors.toLowerCase().includes(query.toLowerCase()) ||
        film.Genre.toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  useEffect(() => {
    if (watchQuery.length > 0) {
      setResults(searchWatchFilms(watchQuery, watchFilms));
    } else {
      setResults(watchFilms);
    }
  }, [watchQuery]);

  return (
    <div className="films">
      {results.map((film, index) => (
        <FilmCard film={film} key={index} content />
      ))}
    </div>
  );
}
export default Watch;
