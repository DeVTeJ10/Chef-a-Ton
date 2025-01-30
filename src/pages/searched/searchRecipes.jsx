import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useLocation, useNavigate } from "react-router-dom";
import "./searchedRecipe.css";

const SearchRecipes = () => {
  const location = useLocation();
  console.log("Full location state:", location.state); // Debug full state
  console.log("Search results:", location.state?.searchResults); // Debug results

  const searchResults = location.state?.searchResults || [];
  const searchQuery = location.state?.searchQuery || '';

  console.log("found searched recipe on searched recipe page", searchResults)

  return (
    <div className="searchRecipesContainer">
      <Header />
      <div className="searchContent">
        <h2 className="searchTitle">Search Results for: {searchQuery}</h2>
        <div className="recipeGrid">
          {searchResults.map((recipe) => (
            <div key={recipe.id} className="recipeCard">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="recipeImage"
              />
              <div className="recipeInfo">
                <h3 className="recipeTitle">{recipe.title}</h3>
                <div className="recipeDetails">
                  <span>Ready in {recipe.readyInMinutes} minutes</span>
                  <span>{recipe.servings} servings</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchRecipes;
