/* eslint-disable no-unreachable */
import React, { useEffect, useState } from "react";
import "../stylesheets/Main.css";
import { GoPlus } from "react-icons/go";
import { GoDash } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import StarRating from "./StarRating";
import { Loader } from "../App";

function average(arr, fn) {
  if (arr.length === 0) return 0; 

  const validValues = arr.filter(item => !isNaN(fn(item))); 

  if (validValues.length === 0) return 0;

  const total = validValues.reduce((a, c) => a + fn(c), 0);
  const avg = total / validValues.length;
  return avg.toFixed(2);
}

function Toggle({ isOpen, setIsOpen }) {
  return (
    <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? <GoDash className="switch" /> : <GoPlus className="switch" />}
    </button>
  );
}

export default function Main({
  watchedMovieList,
  children,
  selectedID,
  setSelectedID,
}) {
  return (
    <main>
      {children}
      <WatchedBox selectedID={selectedID} setSelectedID={setSelectedID} />
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

function WatchedBox({ selectedID, setSelectedID }) {
  let [watchedMovieList, setWatchedMovieList] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className="box">
      {selectedID ? (
        <SelectedMovie
          selectedID={selectedID}
          setSelectedID={setSelectedID}
          setWatchedMovieList={setWatchedMovieList}
        />
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
            <WatchedMovieList
              watchedMovieList={watchedMovieList}
              setWatchedMovieList={setWatchedMovieList}
            />
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
        <span>⭐ {average(watchedMovieList, (movie) => movie.imdbRating)}</span>
        <span>🌟 No Value </span>
        <span>
          ⏳ {average(watchedMovieList, (movie) => movie.Runtime)} mins
        </span>
      </div>
    </div>
  );
}

export function MovieList({ movieList, setSelectedID }) {
  return (
    <ul>
      {movieList.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} setSelectedID={setSelectedID}>
          <h4>{movie.Title}</h4>
          <span id="year">📅 {movie.Year}</span>
        </Movie>
      ))}
    </ul>
  );
}

function handleAddMovie(movie, setWatchedMovieList, setSelectedID) {
  const watchedMovie = {
    imdbID: movie.imdbID,
    Title: movie.Title,
    Year: movie.Year,
    Poster: movie.Poster,
    imdbRating: parseFloat(movie.imdbRating), 
    Runtime: Number(movie.Runtime.replace(" min", "")), 
  };

  setWatchedMovieList((p) => {
    let found = p.find((x) => x.imdbID === movie.imdbID);
    if(!found) return [...p, watchedMovie]
    else return p;
  });
  handleBack(setSelectedID);
}

function WatchedMovieList({ watchedMovieList }) {
  return (
    <ul>
      {watchedMovieList.map((movie) => (
        <Movie key={movie.imdbID} movie={movie}>
          <h4>{movie.Title}</h4>
          <span id="watched-movie-info">
            <span>⭐ {movie.imdbRating}</span>
            <span>📆 {movie.Year}</span>
            <span>⏳ {movie.Runtime} mins</span>
          </span>
        </Movie>
      ))}
    </ul>
  );
}

function handleSelect(id, setSelectedID) {
  setSelectedID(id);
}

function Movie({ movie, children, setSelectedID }) {
  return (
    <li
      onClick={() => handleSelect(movie.imdbID, setSelectedID)}
      className="movie"
    >
      <img
        src={
          movie.Poster === "N/A"
            ? "https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg"
            : movie.Poster
        }
        alt={movie.Title}
      />
      <div className="details">{children}</div>
    </li>
  );
}

function SelectedMovie({ selectedID, setSelectedID, setWatchedMovieList }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getMovie() {
      setLoading(true);
      let a = await fetch(
        `https://www.omdbapi.com/?apikey=8e082d08&i=${selectedID}`
      );
      let b = await a.json();
      setMovie(b);
      setLoading(false);
    }
    getMovie();
  }, [selectedID]);

  return (
    <div className="selectedMovie">
      <BackButton setSelectedID={setSelectedID} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="movie-details">
            <img src={movie.Poster} alt={movie.Title} />
            <div className="detail-box">
              <h3>{movie.Title}</h3>
              <div>
                <span>{movie.DVD}</span>
                <span>{movie.Runtime}</span>
              </div>
              <p>{movie.Genre}</p>
              <p>⭐ {movie.imdbRating} IMDB Rating</p>
            </div>
          </div>
          <button onClick={() => handleAddMovie(movie, setWatchedMovieList, setSelectedID)}>
            Mark as Watched
          </button>
          <StarRating />
          <div className="movie-info">
            <p>{movie.Plot}</p>
            <p>{movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </div>
        </>
      )}
    </div>
  );
}

function handleBack(setSelectedID) {
  setSelectedID(null);
}

function BackButton({ setSelectedID }) {
  return (
    <div className="back-btn" onClick={() => handleBack(setSelectedID)}>
      <GoArrowLeft />
    </div>
  );
}
