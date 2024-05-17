/* eslint-disable no-unreachable */
import React from "react";
import "../stylesheets/Main.css";
import { GoPlus } from "react-icons/go";
import { GoDash } from "react-icons/go";

function average(arr, fn) {
  let total = arr.reduce((a, c) => a + fn(c), 0);
  let avg = total / arr.length;
  return avg;
}

function Toggle({ isOpen, setIsOpen }) {
  return (
    <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? <GoDash className="switch" /> : <GoPlus className="switch" />}
    </button>
  );
}

export default function Main({ watchedMovieList, children, selectedID }) {
  return (
    <main>
      {children}
      <WatchedBox movieList={watchedMovieList} selectedID={selectedID} />
    </main>
  );
}

export function ListBox({ children }) {
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

      {isOpen ? children : null}
    </div>
  );
}

function WatchedBox({ movieList, selectedID }) {
  let [watchedMovieList, setWatchedMovieList] = React.useState(movieList);
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className="box">
      {selectedID ? (
        <SelectedMovie selectedID={selectedID}/>
      ) : (
        <>
          <StatBox
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            watchedMovieList={watchedMovieList}
          >
            <Toggle isOpen={isOpen} setIsOpen={setIsOpen} />
          </StatBox>
          <div style={{ marginBottom: "80px" }}></div>
          {isOpen ? (
            <WatchedMovieList watchedMovieList={watchedMovieList} />
          ) : null}
        </>
      )}
    </div>
  );
}

function StatBox({ watchedMovieList, setWatchedMovieList, children }) {
  return (
    <div className="stat-box">
      <div>
        <h5>MOVIES YOU WATCHED</h5>
        {children}
      </div>
      <div>
        <span>#️⃣ {watchedMovieList.length} movies</span>
        <span>⭐ {average(watchedMovieList, (movie) => movie.rating)}</span>
        <span>🌟 9.5</span>
        <span>
          ⏳ {average(watchedMovieList, (movie) => movie.watchTimeMinutes)} mins
        </span>
      </div>
    </div>
  );
}

export function MovieList({ movieList, setSelectedID }) {
  return (
    <ul>
      {movieList.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          setSelectedID={setSelectedID}
        >
          <h4>{movie.Title}</h4>
          <span id="year">📅 {movie.Year}</span>
        </Movie>
      ))}
    </ul>
  );
}
function WatchedMovieList({ watchedMovieList }) {
  return (
    <ul>
      {watchedMovieList.map((movie) => (
        <Movie key={movie.imdb} posterUrl={movie.posterUrl} name={movie.name}>
          <h4>{movie.name}</h4>
          <span id="watched-movie-info">
            <span>⭐ {movie.rating}</span>
            <span>📆 {movie.year}</span>
            <span>⏳ {movie.watchTimeMinutes} mins</span>
          </span>
        </Movie>
      ))}
    </ul>
  );
}

function handleSelect(id, setSelectedID){
  setSelectedID(id);
}

function Movie({ movie, children, setSelectedID }) {
  return (
    <li onClick={() => handleSelect(movie.imdbID, setSelectedID)} className="movie">
      <img src={movie.Poster === "N/A"
              ? "https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg"
              : movie.Poster} alt={movie.Title} />
      <div className="details">{children}</div>
    </li>
  );
}

function SelectedMovie({ selectedID }) {
  return <div className="selectedMovie">{selectedID}</div>;
}
