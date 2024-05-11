import React from "react";
import "../stylesheets/Main.css";
import { GoPlus } from "react-icons/go";
import { GoDash } from "react-icons/go";


function average(arr, type) {
  let total = arr.reduce((a, c) => a + (type === 'ratings' ? c.rating : c.watchTimeMinutes), 0);
  let avg = total / arr.length;
  console.log(avg);
  return avg;
}

function Toggle({ isOpen, setIsOpen }) {
  return (
    <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? <GoDash className="switch" /> : <GoPlus className="switch" />}
    </button>
  );
}

export default function Main({movieList}) {
  return (
    <main>
      <ListBox movieList={movieList}/>
      <WatchedBox movieList={movieList}/>
    </main>
  );
}

function ListBox({movieList}) {
  const [isOpen, setIsOpen] = React.useState(true);
   return (
    <div className="box">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <h3>Movie Listings</h3>
        <Toggle isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {isOpen ? <MovieList movieList={movieList}/> : null}
    </div>
  );
}

function MovieList({movieList}) {
  return (
    <ul>
      {movieList.map((movies) => (
        <Movie
          key={movies.imdb}
          posterUrl={movies.posterUrl}
          name={movies.name}
          year={movies.year}
        />
      ))}
    </ul>
  );
}

function Movie({ key, posterUrl, name, year }) {
  return (
    <li className="movie" key={key}>
      <img src={posterUrl} alt={name} />
      <div className="details">
        <h4>{name}</h4>
        <span id="year">📆 {year}</span>
      </div>
    </li>
  );
}

function WatchedBox({movieList}) {
  let [watchedMovieList, setWatchedMovieList] = React.useState(movieList);
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className="box">
      <StatBox isOpen={isOpen} setIsOpen={setIsOpen} watchedMovieList={watchedMovieList}/>
      <div style={{ marginBottom: "80px" }}></div>
      {isOpen ? <WatchedMovieList watchedMovieList={watchedMovieList}/> : null}
    </div>
  );
}

function StatBox({isOpen, setIsOpen, watchedMovieList, setWatchedMovieList}) {
  return (
    <div className="stat-box">
      <div>
        <h5>MOVIES YOU WATCHED</h5>
        <Toggle isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div>
        <span>#️⃣ {watchedMovieList.length} movies</span>
        <span>⭐ {average(watchedMovieList,'ratings')}</span>
        <span>🌟 9.5</span>
        <span>⏳ {average(watchedMovieList,'timings')} mins</span>
      </div>
    </div>
  );
}

function WatchedMovieList({watchedMovieList}){
  return(<ul>
    {watchedMovieList.map((movie) => (
      <WatchedMovie
        key={movie.imdb}
        posterUrl={movie.posterUrl}
        name={movie.name}
        year={movie.year}
        rating={movie.rating}
        watchTimeMinutes={movie.watchTimeMinutes}
      />
    ))}
  </ul>);
}

function WatchedMovie({ key, posterUrl, name, year, rating, watchTimeMinutes }){
  return <li className="movie" key={key}>
      <img src={posterUrl} alt={name} />
      <div className="details">
        <h4>{name}</h4>
        <span id="watched-movie-info">
          <span>⭐ {rating}</span>
          <span>📆 {year}</span>
          <span>⏳ {watchTimeMinutes} mins</span>
        </span>
      </div>
    </li>
}
