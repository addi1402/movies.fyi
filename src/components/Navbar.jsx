import React from "react";
import '../stylesheets/Navbar.css';
import { GoSearch } from "react-icons/go";
import { GoStarFill } from "react-icons/go";

export default function Navbar() {
  return (
    <header>
      <div className="left-group">
        <Logo />
        <SearchBar />
      </div>
      <Stats />
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

function SearchBar() {
  let [query, setQuery] = React.useState("");
  return (
    <div id="query-box">
      <GoSearch id="search-icon" />
      <input
        type="text"
        name="query"
        id="query"
        placeholder="Search Movies"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}

function Stats() {
  return <p>Found X results</p>;
}