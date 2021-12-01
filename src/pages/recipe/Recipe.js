import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

// Hooks
import { useFetch } from "../../hooks/useFetch";

// Styles
import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  const url = "http://localhost:3000/recipes/" + id;
  const { data: recipe, isPending, error } = useFetch(url);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      // if any error navigate(or redirect) to home page
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [error, navigate]);

  return (
    <div className="recipe">
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
        </>
      )}
    </div>
  );
}
