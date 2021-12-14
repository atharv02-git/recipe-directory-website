import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

// styles
import "./Navbar.css";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { defaultColor } = useTheme();

  return (
    <div className="navbar" style={{ background: defaultColor }}>
      <nav>
        <Link to="/" className="brand">
          <h1>My Recipes</h1>
        </Link>
        <SearchBar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
