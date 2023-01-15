import { createContext, useEffect, useState } from "react";
import defaultFilms from "../data/default-films.json";
import axios from "axios";

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [watchQuery, setWatchQuery] = useState("");
  const [favQuery, setFavQuery] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [films, setFilms] = useState([]);
  const [watchFilms, setWatchFilms] = useState([]);
  const [favFilms, setFavFilms] = useState([]);
  const [user, setUser] = useState({
    _id: "",
    username: "",
    token: "",
  });

  // Set initial films on watch list from MongoDB (TODO: tidy up and fix)
  const getInitialWatchFilms = async (id) => {
    const response = await axios.get(`/api/users/${id}/watchList`);
    // console.log(response);

    return response.data;
  };

  useEffect(() => {
    const setInitialWatchFilms = async () => {
      if (user._id !== "") {
        // console.log("IN FUNCTION");
        // console.log("user", user._id);
        try {
          const data = await getInitialWatchFilms(user._id);
          // console.log(data);

          setWatchFilms(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    setInitialWatchFilms();
  }, [user]);

  // Check if user is logged in (TODO: tidy up)
  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("user"));
    // console.log(loggedIn);
    if (loggedIn) {
      // console.log("Logged in");
      setUser({
        _id: loggedIn._id,
        username: loggedIn.username,
        token: loggedIn.token,
      });
    }
  }, []);

  useEffect(() => {
    // console.log(user);
  }, [user]);

  // Query OMDB API with search input
  const searchFilmRequest = async (query) => {
    if (query.length < 3) {
      setFilms(reorderFilms(defaultFilms));
    } else {
      const url = `http://www.omdbapi.com/?apikey=be2c0c1&type=movie&s=${query}`;
      const response = await fetch(url);
      const responseJson = await response.json();

      // console.log(responseJson);

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

    // console.log(responseJsonImdb);

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
    const filmDataFull = await getFilmRequest(film);
    const filmData = {
      Title: filmDataFull.Title,
      Year: filmDataFull.Year,
      Runtime: filmDataFull.Runtime,
      Genre: filmDataFull.Genre,
      Director: filmDataFull.Director,
      Actors: filmDataFull.Actors,
      Plot: filmDataFull.Plot,
      Poster: filmDataFull.Poster,
      imdbRating: filmDataFull.imdbRating,
      imdbID: filmDataFull.imdbID,
    };

    const isFilmInList = await watchFilms.filter(
      (item) => item.Title === filmData.Title
    );

    if (isFilmInList.length == 0) {
      try {
        const newWatchList = watchFilms.concat(filmData);
        // console.log(newWatchList);

        const formData = {
          watchList: newWatchList,
        };
        const response = await axios.put(
          `/api/users/${user._id}/watchList`,
          formData
        );
        // console.log(response);
        setWatchFilms(newWatchList);
      } catch (error) {
        // console.log(error);
      }
    } else {
      const newWatchList = watchFilms.filter(
        (item) => item.Title !== filmData.Title
      );
      // console.log(newWatchList);

      const formData = {
        watchList: newWatchList,
      };
      const response = await axios.put(
        `/api/users/${user._id}/watchList`,
        formData
      );
      // console.log(response);
      setWatchFilms(newWatchList);
    }
  };

  // Update films on watch list
  const updateFavFilm = async (film) => {
    const filmDataFull = await getFilmRequest(film);
    const filmData = {
      Title: filmDataFull.Title,
      Year: filmDataFull.Year,
      Runtime: filmDataFull.Runtime,
      Genre: filmDataFull.Genre,
      Director: filmDataFull.Director,
      Actors: filmDataFull.Actors,
      Plot: filmDataFull.Plot,
      Poster: filmDataFull.Poster,
      imdbRating: filmDataFull.imdbRating,
      imdbID: filmDataFull.imdbID,
    };
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

  // Query watch films with watch search input
  const searchWatchFilms = (watchQuery) => {
    // console.log(watchQuery);
    // console.log(watchFilms);
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
      searchWatchFilms(watchQuery);
    }, 500);

    setTimeoutId(newTimeoutId);
  }, [query, watchQuery, watchFilms, favFilms]);

  return (
    <AppContext.Provider
      value={{
        query,
        watchQuery,
        favQuery,
        films,
        watchFilms,
        favFilms,
        user,
        updateWatchFilm,
        updateFavFilm,
        setQuery,
        setWatchQuery,
        setFavQuery,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
