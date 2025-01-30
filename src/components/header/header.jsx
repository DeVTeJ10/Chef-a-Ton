import { Link, useNavigate } from "react-router-dom";
import useUserName from "../../userNameHook";
import "./header.css"
import logoImg from "../../images/cookaton.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { assign } from "lodash";

const Header = () => {
    const { user } = useUserName();
    const navigate = useNavigate()
    const [searchForRecipes, setSearchForRecipes] = useState()
    const [inputValue, setInputValue] = useState('')
    const apiKey = 'ad501590243a4ad2951d9582a731d140'


    console.log(user);


    useEffect(() => {
        if (searchForRecipes) {
            console.log("Search results updated:", searchForRecipes);
            // navigate('/searched-page', { state: { searchResults: searchForRecipes, searchQuery: inputValue } });
        }
    }, [searchForRecipes]);


    const searchRecipe = async () => {
        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch?query=${inputValue}&apiKey=${apiKey}&number=30`,
                {
                    headers: {
                        'Content-Type': 'application/json', 
                    }
                }
            );
            setSearchForRecipes(response.data.results);
            return response; // Return the full response
        } catch (error) {
            console.error("Error:", error.message);
            return null;
        }
    };


    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const searchResults = await searchRecipe();
            if (searchResults) {
                navigate('/searched-page', { 
                    state: { 
                        searchResults: searchResults.data.results, 
                        searchQuery: inputValue 
                    } 
                });
            }
        }
    }


    return (
        <div>
            <div className='heading2'>
                <div className='heading'>
                    <div className='logos'>
                        <img
                            src={logoImg}
                            width={80}
                            height={80}
                            className="cookingtons"
                            alt="Villa"
                        />
                    </div>

                    <div className="headersLinks">
                        <div className="headers">
                            <Link to={"/"} className="homeTag">
                                <h3>Home</h3>
                            </Link>
                            {/* <Link to={"/recipe-page"} className="recipeTag"> */}
                            <h3>Recipe</h3>
                            {/* </Link> */}
                            <Link to={"/aboutUs-page"} className="aboutUsTag">
                                <h3>{user.displayName}</h3>
                            </Link>
                            <Link to={"/favourites-page"} className="favouritesTag">
                                <h3>Favourites</h3>
                            </Link>
                            {/* <Link to={"/favourites-page"} className="favouritesTag"> */}
                                <h3>Searched recipe</h3>
                            {/* </Link> */}
                        </div>
                    </div>

                    <div className="inputinup">
                        <input
                            placeholder='Search for recipe' 
                            className='inputRecipe'
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyPress}/>

                        {
                            <div className="authentication">
                                <Link to={"/login"}>
                                    <button className="login">Login</button>
                                </Link>
                                <Link to={"/signup"}>
                                    <button className="signUp">Sign up</button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header