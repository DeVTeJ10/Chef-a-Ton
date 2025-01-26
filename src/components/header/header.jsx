import { Link } from "react-router-dom";
import useUserName from "../../userNameHook";
import { useParams } from "react-router-dom";
import "./header.css"
import logoImg from "../../images/cookaton.png";
import { useState } from "react";
import axios from "axios";
import { assign } from "lodash";

const Header = () => {
    const { user } = useUserName();
    const [searchForRecipes, setSearchForRecipes] = useState()
    const [inputValue, setInputValue] = useState('')

    const apiKey = 'ad501590243a4ad2951d9582a731d140'

    console.log(user);


    const searchRecipe = async () => {

      try{

        const searchRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${inputValue}&apiKey=${apiKey}&number=30`, {
            headers: {
              'Content-Type': 'application/json', 
            }
          }
        );
        const searchedRecipe = searchRecipes
        setSearchForRecipes(searchedRecipe)
      } catch (error) {
        console.error("Error:", error.message);
      }
    };


    const handleKeyPress = async (event) => {

        if (event.key === 'Enter'){
            console.log("You got it TeJ", inputValue)
            event.preventDefault();
            searchRecipe()
            console.log("Found the value yeah?",searchForRecipes)
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