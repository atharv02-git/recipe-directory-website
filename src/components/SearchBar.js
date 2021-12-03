import { useState } from "react";
import { useNavigate } from "react-router";
// Styles
import "./SearchBar.css";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    navigate(`search?query=${searchValue}`);
  };

  return (
    <div className="searchbar">
      <form onSubmit={searchSubmitHandler}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setSearchValue(e.target.value)}
          required
        />
      </form>
    </div>
  );
}
