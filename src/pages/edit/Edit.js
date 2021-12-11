import { projectFirestore } from "../../firebase/config";
import { useParams, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import { useState, useRef } from "react";
// style
import "./Edit.css";

// Hooks
import { useTheme } from "../../hooks/useTheme";

export default function Edit() {
  const location = useLocation();
  const { recipe } = location.state;

  const [title, setTitle] = useState(recipe.title);
  const [method, setMethod] = useState(recipe.method);
  const [cookingTime, setCookingTime] = useState(
    recipe.cookingTime.slice(0, 1)
  );
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  // useRef
  const ingredientInput = useRef(null);

  const { mode } = useTheme();
  const navigate = useNavigate();
  // Destructuring id
  const { id } = useParams();

  const submitFormHandler = async (e) => {
    e.preventDefault();
    console.log(title, method, cookingTime, ingredients);
    try {
      await projectFirestore
        .collection("recipes")
        .doc(id)
        .update({
          title:title,
          ingredients:ingredients,
          method:method,
          cookingTime:
            cookingTime.slice(0, 1) === "1"
              ? cookingTime.slice(0, 1) + "minute"
              : cookingTime.slice(0, 1) + "minutes",
        });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteIngredient = (ing) => {
    const newIngs = ingredients.filter((ingredient) => ingredient !== ing);
    setIngredients(newIngs);
  };

  const addIngredientHandler = (e) => {
    e.preventDefault();
    // To check no duplicate values to be repeated
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  return (
    <div className={`edit ${mode}`}>
      <h2 className="page-title">Edit Recipe</h2>
      {recipe && (
        <form onSubmit={submitFormHandler}>
          <label>
            <span>Recipe Title:</span>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </label>

          <label>
            <span>Cooking Ingredients:</span>
            <div className="ingredients">
              <input
                type="text"
                onChange={(e) => setNewIngredient(e.target.value)}
                value={newIngredient}
                ref={ingredientInput}
              />
              <button onClick={addIngredientHandler} className="btn">
                add
              </button>
            </div>
          </label>
          <p>
            Current ingredients:{" "}
            {ingredients.map((i) => (
              <span
                className="ingredient"
                key={i}
                onClick={() => deleteIngredient(i)}
              >
                {i}{" "}
              </span>
            ))}
          </p>
          
          <label>
            <span>Recipe Method:</span>
            <textarea
              onChange={(e) => setMethod(e.target.value)}
              value={method}
              required
            />
          </label>
          <label>
            <span>Cooking Time (minutes):</span>
            <input
              onChange={(e) => setCookingTime(e.target.value)}
              type="number"
              value={cookingTime}
              required
            />
          </label>
          <button className="btn">Update</button>
        </form>
      )}
    </div>
  );
}
