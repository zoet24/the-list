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
    const urlImdb = `http://www.omdbapi.com/?apikey=be2c0c1&i=${filmImdb}&plot=long`;
    const responseImdb = await fetch(urlImdb);
    const responseJsonImdb = await responseImdb.json();

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

  // Update films on watch list
  const updateWatchFilm = async (film) => {
    const filmData = await getFilmRequest(film);
    const isFilmInList = await watchFilms.filter(
      (item) => item.Title === filmData.Title
    );

    if (isFilmInList.length == 0) {
      const newWatchList = watchFilms.concat(filmData);
      setWatchFilms(newWatchList);
    } else {
      const newWatchList = watchFilms.filter(
        (item) => item.Title !== filmData.Title
      );
      setWatchFilms(newWatchList);
    }
  };

  // Update films on watch list
  const updateFavFilm = async (film) => {
    const filmData = await getFilmRequest(film);
    const isFilmInList = await favFilms.filter(
      (item) => item.Title === filmData.Title
    );

    if (isFilmInList.length == 0) {
      const newFavList = favFilms.concat(filmData);
      setFavFilms(newFavList);
    } else {
      const newFavList = favFilms.filter(
        (item) => item.Title !== filmData.Title
      );
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
