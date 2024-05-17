import React from "react";
import "../stylesheets/Navbar.css";
import { GoSearch } from "react-icons/go";
import { GoStarFill } from "react-icons/go";

export default function Navbar({children, query, setQuery, handleChange }) {
  return (
    <header>
      <div className="left-group">
        <Logo />
        <SearchBar query={query} setQuery={setQuery} handleChange={handleChange}/>
      </div>
      {children}
    </header>
  );
}

function Logo() {
  return (
    <div className="logo">
      <GoStarFill />
      <span>movies.fyi</span>
    </div>
  );
}

function SearchBar({query, setQuery, handleChange}) {
  return (
    <div id="query-box">
      <GoSearch id="search-icon" />
      <input
        type="text"
        name="query"
        id="query"
        placeholder="Search Movies"
        value={query}
        onChange={(e) => handleChange(e)}
        autoComplete="off"
      />
    </div>
  );
}

export function Stats(props) {
  return <p>Found {props.movieList.length} results.</p>;
}