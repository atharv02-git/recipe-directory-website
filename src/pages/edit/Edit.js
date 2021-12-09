import { useState, useRef} from "react";
// style
import "./Edit.css";

// Hooks
import { useTheme } from "../../hooks/useTheme";


export default function Edit() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  // useRef
  const ingredientInput = useRef(null);

  const { mode } = useTheme();

  const editFormHandler = (e) => {
    e.preventDefault();
    console.log(title, method, cookingTime, ingredients);
  };

  const addIngredientHandler = (e) => {
    e.preventDefault();

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
      <form onSubmit={editFormHandler}>
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
        <p>Current Ingredients: {ingredients.map(i => (
          <em key={i}>{i},</em>
        ))}</p>
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
    </div>
  );
}