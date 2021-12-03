import { Link } from "react-router-dom";

// components
import "./RecipeList.css";

export default function recipeList({ recipes }) {
  if (recipes.length === 0) {
    return <div className="error">Oops, No recipes to load :(</div>;
  }
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="card">
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime}</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`recipes/${recipe.id}`}>Recipe Preview</Link>
        </div>
      ))}
    </div>
  );
}
