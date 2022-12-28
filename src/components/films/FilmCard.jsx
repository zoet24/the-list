function FilmCard() {
  return (
    <div key={index} className="film">
      <div className="relative">
        <div className="film__img">
          <img className="w-full" src={film.Poster} alt="" />
        </div>
        <h3 className="film__title absolute bottom-0 px-2 py-3">
          {film.Title}
        </h3>
      </div>
      {/* <div className="film__content">
            <div className="film__meta justify-between">
              <div className="flex">
                <p className="film__meta--year">{film.Year}</p>
                <p className="film__meta--time">{index}</p>
                <p className="film__meta--time">{film.time} mins</p>
                <p className="film__meta--director">{film.director}</p>
              </div>
            </div>
            <div className="film__categories">
              {film.categories.map((cat, indexCat) => (
                <p key={indexCat} className="film__category">
                  {cat}
                </p>
              ))}
            </div>
            <p className="film__description">{film.Plot}</p>
          </div> */}
    </div>
  );
}
export default FilmCard;
