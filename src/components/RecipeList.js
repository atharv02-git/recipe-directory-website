import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import DeleteIcon from "../assets/delete-icon.svg";
import { projectFirestore } from "../firebase/config";
// styles
import "./RecipeList.css";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();

  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }

  const deleteHandler = (id) => {
    projectFirestore
      .collection("recipes")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} minutes to make</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img
            alt="delete-icon"
            className="delete"
            src={DeleteIcon}
            onClick={() => deleteHandler(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
}
