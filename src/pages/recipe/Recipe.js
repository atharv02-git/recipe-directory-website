import { projectFirestore } from "../../firebase/config";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
// Hooks
import { useTheme } from "../../hooks/useTheme";

// Styles
import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState("");
  const [isPending, setIsPending] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setIsPending(true);

    projectFirestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        console.log(doc);
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("Ops, couldn't find that recipe :(");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  return (
    <div className={`recipe ${mode}`}>
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
          <Link className="button" to={`/edit/${id}`}>
            Edit Recipe
          </Link>
        </>
      )}
    </div>
  );
}
