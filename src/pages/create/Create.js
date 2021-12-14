import { projectFirestore } from "../../firebase/config";
import { useState, useRef } from "react";

import { useNavigate } from "react-router";
import { useTheme } from "../../hooks/useTheme";
// styles
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  // single ingredient state
  const [newIngredient, setNewIngredient] = useState("");
  // ingredients array
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  // Navigate
  const navigate = useNavigate();

  const { mode } = useTheme();

  const submitHandler = async (e) => {
    e.preventDefault();
    const doc = {
      title,
      ingredients,
      method,
      cookingTime
    };
    try {
      await projectFirestore.collection("recipes").add(doc);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const addIngredientHandler = (e) => {
    e.preventDefault();

    const ing = newIngredient.trim();
    // to check if ingredient exist already in ingredients array so no duplicate value can be put into array
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  return (
    <div className={`create ${mode}`}>
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={submitHandler}>
        <label>
          <span>Recipe Title:</span>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
            required
          />
        </label>
        {/* ingredients goes here */}
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
          Current Ingredients:
          {ingredients.map((i) => (
            <em key={i}>{i},</em>
          ))}
        </p>
        {/* Method */}
        <label>
          <span>Recipe Method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        {/* cooking time */}
        <label>
          <span>Cooking Time (minutes):</span>
          <input
            onChange={(e) => setCookingTime(e.target.value)}
            type="number"
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
