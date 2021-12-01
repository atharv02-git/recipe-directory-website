import { useState } from "react";
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(title, method, cookingTime);
  };

  return (
    <div className="create">
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
        {/* Method */}
        <label>
          <span>Cooking method:</span>
          <input
            onChange={(e) => setMethod(e.target.value)}
            type="text"
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
