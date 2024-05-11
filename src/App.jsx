import React from "react";
import './styles.css';
import Navbar from "./components/Navbar";
import Main from "./components/Main";

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
  

export default function App(){
    const [movieList, setMovies] = React.useState(movies);

    return <div className="App">
        <Navbar/>
        <Main movieList={movieList}/>
    </div>
}