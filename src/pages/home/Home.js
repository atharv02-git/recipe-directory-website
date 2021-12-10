import { projectFirestore } from "../../firebase/config";

import { useState, useEffect } from "react";
import RecipeList from "../../components/RecipeList";

// custom hook
import { useTheme } from "../../hooks/useTheme";
// styles
import "./Home.css";

export default function Home() {
  const { mode } = useTheme();

  const [data, setData] = useState("");
  const [isPending, setIsPending] = useState("");
  const [error, setError] = useState("");

  // function to fetch data from firestore in home page
  useEffect(() => {
    setIsPending(true);
    // where unSub is a cleanup function
    const unSubscribe = projectFirestore.collection("recipes").onSnapshot((snapshot) => {
        if (snapshot.empty) {
          setError("Ops, No recipes to load :(");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsPending(false);
        }
      }, (err)=>{
        setError(err.message)
        setIsPending(false)
      })

      return ()=>{unSubscribe()}
  }, []);

  return (
    <div className={`home ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
