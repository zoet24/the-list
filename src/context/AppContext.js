import { createContext, useEffect, useState } from "react";
import defaultFilms from "../data/default-films.json";

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [films, setFilms] = useState([]);
  const [watchFilms, setWatchFilms] = useState([]);
  const [favFilms, setFavFilms] = useState([]);

  // Query OMDB API with search input
  const searchFilmRequest = async (query) => {
    if (query.length < 3) {
      setFilms(reorderFilms(defaultFilms));
    } else {
      const url = `http://www.omdbapi.com/?apikey=be2c0c1&type=movie&s=${query}`;
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.Search) {
        setFilms(reorderFilms(responseJson.Search));
      } else {
        setFilms(reorderFilms(defaultFilms));
      }
    }
  };

  // Query OMDB API with specific film
  const getFilmRequest = async (film) => {
    const filmImdb = film.imdbID;
    const urlImdb = `http://www.omdbapi.com/?apikey=be2c0c1&i=${filmImdb}`;
    const responseImdb = await fetch(urlImdb);
    const responseJsonImdb = await responseImdb.json();

    console.log(responseJsonImdb);

    return responseJsonImdb;
  };

  // Reorder films with 2 column masonry layout
  const reorderFilms = (filmArr) => {
    let col1 = [];
    let col2 = [];

    for (let i = 0; i < filmArr.length; i++) {
      if (i % 2) {
        col2.push(filmArr[i]);
      } else {
        col1.push(filmArr[i]);
      }
    }

    const reorderedFilmArr = col1.concat(col2);
    return reorderedFilmArr;
  };

  // Update films on watch list (http://www.omdbapi.com/?i=tt0111161)
  const updateWatchFilm = async (film) => {
    const filmData = await getFilmRequest(film);
    console.log(watchFilms);

    if (!watchFilms.includes(filmData)) {
      const newWatchList = watchFilms.concat(filmData);
      setWatchFilms(newWatchList);
      console.log("Does not include");
    } else {
      const newWatchList = watchFilms.filter((f) => f !== filmData);
      setWatchFilms(newWatchList);
      console.log("Does include");
    }
  };

  // Update films on fav list
  const updateFavFilm = async (film) => {
    const filmData = await getFilmRequest(film);

    if (!favFilms.includes(filmData)) {
      const newFavList = favFilms.concat(filmData);
      setFavFilms(newFavList);
    } else {
      const newFavList = favFilms.filter((f) => f !== filmData);
      setFavFilms(newFavList);
    }
  };

  useEffect(() => {
    if (timeoutId) {
      // console.log("Loading");
      clearTimeout(timeoutId);
    }

    // Delay searchFilmRequest by 0.5s to avoid half search results
    const newTimeoutId = setTimeout(() => {
      // console.log("Not loading");
      searchFilmRequest(query);
    }, 500);

    // console.log(watchFilms, favFilms);

    setTimeoutId(newTimeoutId);
  }, [query, watchFilms, favFilms]);

  return (
    <AppContext.Provider
      value={{
        query,
        films,
        watchFilms,
        favFilms,
        updateWatchFilm,
        updateFavFilm,
        setQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;