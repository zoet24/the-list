import { AiFillEye, AiFillHeart, AiOutlineStar } from "react-icons/ai";
import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

// Content is a boolean that is passed into the FilmCard component to show/hide additional content like director, genres. etc
function FilmCard({ film, content }) {
  const { updateFavFilm, updateWatchFilm, watchFilms, favFilms } =
    useContext(AppContext);

  const isFilmInWatchList = watchFilms.filter(
    (item) => item.Title === film.Title
  );
  const isFilmInFavList = favFilms.filter((item) => item.Title === film.Title);

  return (
    <div className={`film${content ? " film--content" : ""}`}>
      <div className="relative">
        <div className="film__img relative">
          {film.Poster !== "N/A" ? (
            <>
              <img className="w-full" src={film.Poster} alt={film.Title} />
            </>
          ) : (
            <>
              <div className="w-full h-64"></div>
            </>
          )}
          <h3 className="film__title absolute bottom-0 px-2 py-3">
            {film.Title}
          </h3>
          <div className="icon-overlay absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
            <div className="icon-row flex">
              <div
                className={`icon${
                  isFilmInWatchList.length > 0 ? " icon--active" : ""
                }`}
                onClick={() => updateWatchFilm(film)}
              >
                <AiFillEye />
              </div>
              <div
                className={`icon${
                  isFilmInFavList.length > 0 ? " icon--active" : ""
                }`}
                onClick={() => updateFavFilm(film)}
              >
                <AiFillHeart />
              </div>
            </div>
          </div>
        </div>
        {content && (
          <div className="film__content">
            <div className="film__meta flex flex-wrap justify-between">
              <p className="film__meta--director">{film.Director}</p>
              <div className="flex">
                <p className="film__meta--year">{film.Year}</p>
                <p className="film__meta--time">
                  {film.Runtime.split(" ")[0]} mins
                </p>
                <div className="film__meta--imdb flex items-center">
                  <AiOutlineStar />
                  <p className="ml-1">{film.imdbRating}</p>
                </div>
              </div>
            </div>
            <div className="film__categories">
              {film.Genre.split(", ").map((cat, indexCat) => (
                <p key={indexCat} className="film__category">
                  {cat}
                </p>
              ))}
            </div>
            <p className="film__description">{film.Plot}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default FilmCard;
