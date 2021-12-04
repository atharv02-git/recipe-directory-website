import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// components
import Navbar from "./components/Navbar";

// Pages
import Create from "./pages/create/Create";
import Home from "./pages/home/Home";
import Recipe from "./pages/recipe/Recipe";
import Search from "./pages/search/Search";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="create" element={<Create />}></Route>
          <Route path="search" element={<Search />}></Route>
          <Route path="recipes/:id" element={<Recipe />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
