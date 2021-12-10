import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useState, useEffect } from "react";
import { projectFirestore } from "../../firebase/config";
import { Link } from "react-router-dom";

// styles
import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const unSubscribe = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError(`Could not find that recipe`);
        }
      });

    return () => unSubscribe();
  }, [id]);

  // const handleClick = () => {
  //   projectFirestore.collection('recipes').doc(id).update({
  //     title: 'Veggie Stew'
  //   })
  // }

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            Recipe includes
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <em className="method">{recipe.method}</em>
          <Link
            className="button"
            to={`/edit/${id}}`}
            state={{ recipe: recipe, }}
          >
            Edit
          </Link>
        </>
      )}
    </div>
  );
}
