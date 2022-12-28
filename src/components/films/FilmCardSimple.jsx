import { AiFillEye, AiFillHeart } from "react-icons/ai";
import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

function FilmCardSimple({ film }) {
  const { updateFavFilm, updateWatchFilm } = useContext(AppContext);

  return (
    <div className="film">
      <div className="relative">
        <div className="film__img">
          {film.Poster !== "N/A" ? (
            <>
              <img className="w-full" src={film.Poster} alt={film.Title} />
            </>
          ) : (
            <>
              <div className="w-full h-64"></div>
            </>
          )}
        </div>
        <h3 className="film__title absolute bottom-0 px-2 py-3">
          {film.Title}
        </h3>
        <div className="icon-overlay absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
          <div className="icon-row flex">
            <div className="icon" onClick={() => updateWatchFilm(film)}>
              <AiFillEye />
            </div>
            <div className="icon" onClick={() => updateFavFilm(film)}>
              <AiFillHeart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FilmCardSimple;
