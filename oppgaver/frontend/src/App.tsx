import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";

import RecipesContext from "./context/RecipesContext.tsx";
import { useState } from "react";
import Recipe from "./model/Recipe.tsx";
import { RecipeListPage } from "./pages/recipes/RecipeListPage.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import { RecipePage } from "./pages/recipe/RecipePage.tsx";
import { ImageUploadPage } from "./pages/ImageUpload/ImageUploadPage.tsx";

function App() {
  const [recipeList, setRecipes] = useState<Recipe[]>([]);

  return (
    <RecipesContext.Provider value={{ recipeList, setRecipes }}>
      <div>
        <Router>
          <div className="header-container">
            <Navbar />
          </div>

          <div className="content">
            <Routes>
              /*TODO: Add route for ImageUploadPage*/
              <Route path="/recipes" element={<RecipeListPage />} />
              <Route path="/recipes/:id" element={<RecipePage />} />
              <Route path="/" element={<ImageUploadPage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </RecipesContext.Provider>
  );
}

export default App;
