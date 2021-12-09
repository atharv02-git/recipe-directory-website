import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
// Hooks
import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";

// Styles
import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  const url = "http://localhost:3000/recipes/" + id;
  const { data: recipe, isPending, error } = useFetch(url);
  const navigate = useNavigate();
  const {mode} = useTheme()

  useEffect(() => {
    if (error) {
      // if any error navigate(or redirect) to home page
      setTimeout(() => {
        navigate("/");
      }, 1200);
    }
  }, [error, navigate]);

  return (
    <div className={`recipe ${ mode }`}>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <Link className="button" to={`/edit/${id}`}>Edit Recipe</Link>
        </>
      )}
    </div>
  );
}
