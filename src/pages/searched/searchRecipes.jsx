import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useLocation, Link } from "react-router-dom";
import "./searchedRecipe.css";

const SearchRecipes = () => {
    const location = useLocation();
    console.log("Full location state:", location.state);
    console.log("Search results:", location.state?.searchResults);

    const searchResults = location.state?.searchResults?.data?.results || [];
    const searchQuery = location.state?.searchQuery || '';

    return (
        <div className="searchRecipesContainer">
            <Header />
            <div className="searchRecipesContent">
                <h2 className="searchRecipesTitle">Search Results for: {searchQuery}</h2>
                <div className="searchCardContainer">
                    {searchResults.slice(0, 20).map((recipe) => (
                        <div key={recipe.id} className="searchFoodCard">
                            <div className="searchCardImage">
                                <img 
                                    src={recipe.image}
                                    width={350}
                                    height={234}
                                    className="searchRecipeImage"
                                    alt={recipe.title}
                                />
                            </div>
                            <div className="searchRecipeInfo">
                                <h3 className="searchRecipeTitle">{recipe.title}</h3>
                                <p className="searchRecipeDescription">
                                    Discover the delightful flavors of this amazing recipe
                                </p>
                            </div>
                            <div className="searchRecipeDetails">
                                <p className="searchPrepTime">
                                    {recipe.readyInMinutes}Min - easy prep - {recipe.servings} serves
                                </p>
                                <Link to={`/recipe-page/${recipe.id}/${recipe.title}`}>
                                    <button className="searchRecipeButton">VIEW RECIPE</button>
                                </Link>
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
