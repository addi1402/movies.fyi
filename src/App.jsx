import React, { useState } from "react";
import "./styles.css";
import Navbar from "./components/Navbar";
import Main, { ListBox, MovieList } from "./components/Main";
import { Stats } from "./components/Navbar";

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
    let controller = new AbortController();
    async function fetchData() {
      if(!query) return;
      try {
        // Handling loading
        setIsLoading(true);

        let res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal: controller.signal}
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
    return () => controller.abort();
  }, [query]);

  return (
    <div className="App">
      <Navbar query={query} setQuery={setQuery} handleChange={handleChange}>
        <Stats movieList={movieList} />
      </Navbar>
      <Main watchedMovieList={watchedMovieList} selectedID={selectedID} setSelectedID={setSelectedID}>
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

export function Loader(){
  return <p>Loading Movies!</p>;
}
