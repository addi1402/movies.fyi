import React from "react";
import "../stylesheets/Main.css";
import { GoPlus } from "react-icons/go";
import { GoDash } from "react-icons/go";
import { GoCalendar } from "react-icons/go";

const movies = [
  {
    name: "Inception",
    imdb: "tt1375666",
    posterUrl:
      "https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg",
    year: 2010,
    watchTimeMinutes: 148,
    rating: 8.8,
  },
  {
    name: "The Dark Knight",
    imdb: "tt0468569",
    posterUrl:
      "https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg",
    year: 2008,
    watchTimeMinutes: 152,
    rating: 9.0,
  },
  {
    name: "Interstellar",
    imdb: "tt0816692",
    posterUrl:
      "https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg",
    year: 2014,
    watchTimeMinutes: 169,
    rating: 8.6,
  },
  {
    name: "The Shawshank Redemption",
    imdb: "tt0111161",
    posterUrl:
      "https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg",
    year: 1994,
    watchTimeMinutes: 142,
    rating: 9.3,
  },
  {
    name: "The Godfather",
    imdb: "tt0068646",
    posterUrl:
      "https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg",
    year: 1972,
    watchTimeMinutes: 175,
    rating: 9.2,
  },
];

function Toggle({ isOpen, setIsOpen }) {
  return (
    <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? <GoDash className="switch" /> : <GoPlus className="switch" />}
    </button>
  );
}

export default function Main() {
  return (
    <main>
      <ListBox />
      <WatchedBox />
    </main>
  );
}

function ListBox() {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className="box">
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <h3>Movie Listings</h3>
        <Toggle isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {isOpen ? <MovieList /> : null}
    </div>
  );
}

function WatchedBox() {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className="box">
      <div className="stat-box">
        <div>
          <h5>MOVIES YOU WATCHED</h5>
          <Toggle isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
      </div>
      {isOpen ? <MovieList /> : null}
    </div>
  );
}

function MovieList() {
  return (
    <ul>
      {movies.map((movie) => (
        <Movie key={movie.imdb} posterUrl={movie.posterUrl} name={movie.name}>
          <div className="details">
            <h4>{movie.name}</h4>
              <span id="year">📆 {movie.year}</span>      
          </div>
        </Movie>
      ))}
    </ul>
  );
}

function Movie({ key, posterUrl, name, children }) {
  return (
    <li className="movie" key={key}>
      <img src={posterUrl} alt={name} />
      {children}
    </li>
  );
}
