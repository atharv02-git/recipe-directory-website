import { Link } from "react-router-dom";
// styles
import "./navbar.css";

export default function navbar() {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking Ninja</h1>
        </Link>
        <Link to="create">Create Recipe</Link>
      </nav>
    </div>
  );
}
