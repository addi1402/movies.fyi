import React, { useState } from "react";
import "./styles.css";
import Navbar from "./components/Navbar";
import Main, { ListBox, MovieList } from "./components/Main";
import { Stats } from "./components/Navbar";

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

const KEY = "8e082d08";

export default function App() {
  const [movieList, setMovies] = React.useState([]);
  const [watchedMovieList, setWatchedMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = useState("");
  let [query, setQuery] = React.useState("");
  const [selectedID, setSelectedID] = React.useState(null);

  function handleChange(e){
    setError('');
    setQuery(e.target.value);
  }


  React.useEffect(() => {
    async function fetchData() {
      if(!query) return;
      try {
        // Handling loading
        setIsLoading(true);

        let res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        
        // Handling no internet connectivity
        if (res.ok === false)
          throw new Error(
            "Something went wrong. Check your internet connection."
          );

        let result = await res.json();

        // Handling invalid query
        if(result.Response === 'False') throw new Error("No such movie found. Please try again.");
        setMovies(result.Search);
        
      } catch (e) {
        setError(e.message);
      }finally{
        setIsLoading(false);
      }
    }

    // Setting no search if query is too small
    if(query.length < 3){
      setMovies([]);
      setError('');
      return;
    }

    fetchData();
  }, [query]);

  return (
    <div className="App">
      <Navbar query={query} setQuery={setQuery} handleChange={handleChange}>
        <Stats movieList={movieList} />
      </Navbar>
      <Main watchedMovieList={watchedMovieList} selectedID={selectedID}>
        <ListBox>
          {isLoading ? (
            <Loader/>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <MovieList movieList={movieList} setSelectedID={setSelectedID} />
          )}
        </ListBox>
      </Main>
    </div>
  );
}

function Loader(){
  return <p>Loading Movies!</p>;
}
