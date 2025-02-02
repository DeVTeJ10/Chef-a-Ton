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
    const searchQuery = location.state?.searchQuery || '';

    return (
        <div className="searchRecipesContainer">
            <Header />
            <div className="searchRecipesContent">
                <h2 className="searchRecipesTitle">Search Results for: {searchQuery}</h2>
                <div className="searchCardContainer">
                    {/* Row 1 */}
                    <div className="cardFood">
                        {/* First 3 cards (0-2) */}
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
                                <p className="indulgeFish">Discover the delightful flavors of this amazing recipe</p>
                            </div>
                            <div className="timePrepRecipe">
                                <p className="timePrep">{searchResults[0]?.readyInMinutes}Min - easy prep - {searchResults[0]?.servings} serves</p>
                                <Link to={`/recipe-page/${searchResults[0]?.id}/${searchResults[0]?.title}`}>
                                    <button className="viewRecipeBTN">VIEW RECIPE</button>
                                </Link>
                            </div>
                        </div>

                        <div className="foodCard">
                            <div className="cookCardFood">
                                {sushi && (
                                    <img 
                                        src={searchResults[1]?.image}
                                        width={350}
                                        height={234}
                                        className="cooking1ton"
                                        alt={searchResults[1]?.title}
                                    />
                                )}
                            </div>
                            <div className="savouryFish">
                                <h3>{searchResults[1]?.title}</h3>
                                <p className="indulgeFish">Discover the delightful flavors of this amazing recipe</p>
                            </div>
                            <div className="timePrepRecipe">
                                <p className="timePrep">{searchResults[1]?.readyInMinutes}Min - easy prep - {searchResults[1]?.servings} serves</p>
                                <Link to={`/recipe-page/${searchResults[1]?.id}/${searchResults[1]?.title}`}>
                                    <button className="viewRecipeBTN">VIEW RECIPE</button>
                                </Link>
                            </div>
                        </div>

                        <div className="foodCard">
                            <div className="cookCardFood">
                                {sushi && (
                                    <img 
                                        src={searchResults[2]?.image}
                                        width={350}
                                        height={234}
                                        className="cooking1ton"
                                        alt={searchResults[2]?.title}
                                    />
                                )}
                            </div>
                            <div className="savouryFish">
                                <h3>{searchResults[2]?.title}</h3>
                                <p className="indulgeFish">Discover the delightful flavors of this amazing recipe</p>
                            </div>
                            <div className="timePrepRecipe">
                                <p className="timePrep">{searchResults[2]?.readyInMinutes}Min - easy prep - {searchResults[2]?.servings} serves</p>
                                <Link to={`/recipe-page/${searchResults[2]?.id}/${searchResults[2]?.title}`}>
                                    <button className="viewRecipeBTN">VIEW RECIPE</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="cardFood">
                        {/* Cards 3-5 */}
                        <div className="foodCard">
                            <div className="cookCardFood">
                                {sushi && (
                                    <img 
                                        src={searchResults[3]?.image}
                                        width={350}
                                        height={234}
                                        className="cooking1ton"
                                        alt={searchResults[3]?.title}
                                    />
                                )}
                            </div>
                            <div className="savouryFish">
                                <h3>{searchResults[3]?.title}</h3>
                                <p className="indulgeFish">Discover the delightful flavors of this amazing recipe</p>
                            </div>
                            <div className="timePrepRecipe">
                                <p className="timePrep">{searchResults[3]?.readyInMinutes}Min - easy prep - {searchResults[3]?.servings} serves</p>
                                <Link to={`/recipe-page/${searchResults[3]?.id}/${searchResults[3]?.title}`}>
                                    <button className="viewRecipeBTN">VIEW RECIPE</button>
                                </Link>
                            </div>
                        </div>

                        <div className="foodCard">
                            <div className="cookCardFood">
                                {sushi && (
                                    <img 
                                        src={searchResults[4]?.image}
                                        width={350}
                                        height={234}
                                        className="cooking1ton"
                                        alt={searchResults[4]?.title}
                                    />
                                )}
                            </div>
                            <div className="savouryFish">
                                <h3>{searchResults[4]?.title}</h3>
                                <p className="indulgeFish">Discover the delightful flavors of this amazing recipe</p>
                            </div>
                            <div className="timePrepRecipe">
                                <p className="timePrep">{searchResults[4]?.readyInMinutes}Min - easy prep - {searchResults[4]?.servings} serves</p>
                                <Link to={`/recipe-page/${searchResults[4]?.id}/${searchResults[4]?.title}`}>
                                    <button className="viewRecipeBTN">VIEW RECIPE</button>
                                </Link>
                            </div>
                        </div>

                        <div className="foodCard">
                            <div className="cookCardFood">
                                {sushi && (
                                    <img 
                                        src={searchResults[5]?.image}
                                        width={350}
                                        height={234}
                                        className="cooking1ton"
                                        alt={searchResults[5]?.title}
                                    />
                                )}
                            </div>
                            <div className="savouryFish">
                                <h3>{searchResults[5]?.title}</h3>
                                <p className="indulgeFish">Discover the delightful flavors of this amazing recipe</p>
                            </div>
                            <div className="timePrepRecipe">
                                <p className="timePrep">{searchResults[5]?.readyInMinutes}Min - easy prep - {searchResults[5]?.servings} serves</p>
                                <Link to={`/recipe-page/${searchResults[5]?.id}/${searchResults[5]?.title}`}>
                                    <button className="viewRecipeBTN">VIEW RECIPE</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div className="cardFood">
                        <div className="foodCard">
                            <div className="cookCardFood">
                                {sushi && (
                                    <img 
                                        src={searchResults[6]?.image}
                                        width={350}
                                        height={234}
                                        className="cooking1ton"
                                        alt={searchResults[6]?.title}
                                    />
                                )}
                            </div>
                            <div className="savouryFish">
                                <h3>{searchResults[6]?.title}</h3>
                                <p className="indulgeFish">Discover the delightful flavors of this amazing recipe</p>
                            </div>
                            <div className="timePrepRecipe">
                                <p className="timePrep">{searchResults[6]?.readyInMinutes}Min - easy prep - {searchResults[6]?.servings} serves</p>
                                <Link to={`/recipe-page/${searchResults[6]?.id}/${searchResults[6]?.title}`}>
                                    <button className="viewRecipeBTN">VIEW RECIPE</button>
                                </Link>
                            </div>
                        </div>

                        <div className="foodCard">
                            <div className="cookCardFood">
                                {sushi && (
                                    <img 
                                        src={searchResults[7]?.image}
                                        width={350}
                                        height={234}
                                        className="cooking1ton"
                                        alt={searchResults[7]?.title}
                                    />
                                )}
                            </div>
                            <div className="savouryFish">
                                <h3>{searchResults[7]?.title}</h3>
                                <p className="indulgeFish">Discover the delightful flavors of this amazing recipe</p>
                            </div>
                            <div className="timePrepRecipe">
                                <p className="timePrep">{searchResults[7]?.readyInMinutes}Min - easy prep - {searchResults[7]?.servings} serves</p>
                                <Link to={`/recipe-page/${searchResults[7]?.id}/${searchResults[7]?.title}`}>
                                    <button className="viewRecipeBTN">VIEW RECIPE</button>
                                </Link>
                            </div>
                        </div>

                        <div className="foodCard">
                            <div className="cookCardFood">
                                {sushi && (
                                    <img 
                                        src={searchResults[8]?.image}
                                        width={350}
                                        height={234}
                                        className="cooking1ton"
                                        alt={searchResults[8]?.title}
                                    />
                                )}
                            </div>
                            <div className="savouryFish">
                                <h3>{searchResults[8]?.title}</h3>
                                <p className="indulgeFish">Discover the delightful flavors of this amazing recipe</p>
                            </div>
                            <div className="timePrepRecipe">
                                <p className="timePrep">{searchResults[8]?.readyInMinutes}Min - easy prep - {searchResults[8]?.servings} serves</p>
                                <Link to={`/recipe-page/${searchResults[8]?.id}/${searchResults[8]?.title}`}>
                                    <button className="viewRecipeBTN">VIEW RECIPE</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Would you like me to continue with the remaining cards (9-19)? */}

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SearchRecipes;
