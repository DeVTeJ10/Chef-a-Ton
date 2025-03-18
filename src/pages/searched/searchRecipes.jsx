import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useLocation, Link } from "react-router-dom";
import "./searchedRecipe.css";
import sushi from "../../images/foodsushi.jpg";

const SearchRecipes = () => {
    const location = useLocation();
    console.log("Full location state:", location.state);
    console.log("Search results:", location.state?.searchResults);

    const searchResults = location.state?.searchResults || [];

    return (
        <div>
            <Header />
            <div className="searchedRecipesContainer">
                <div className="cardFood">
                    {/* Single Card */}
                    <div className="foodCard">
                        <div className="cookCardFood">
                            {sushi && (
                                <img 
                                    src={searchResults[0]?.image}
                                    width={350}
                                    height={234}
                                    className="cooking1ton"
                                    alt={searchResults[0]?.title}
                                />
                            )}
                        </div>
                        <div className="savouryFish">
                            <h3>{searchResults[0]?.title}</h3>
                        </div>
                        <div className="timePrepRecipe">
                            <p className="timePrep">{searchResults[0]?.readyInMinutes}Min - easy prep - {searchResults[0]?.servings} serves</p>
                            <Link to={`/recipe-page/${searchResults[0]?.id}/${searchResults[0]?.title}`}>
                                <button className="viewRecipeBTN">VIEW RECIPE</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SearchRecipes;
