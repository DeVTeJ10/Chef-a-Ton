import { Link, useNavigate } from "react-router-dom";
import useUserName from "../../userNameHook";
import "./header.css"
import logoImg from "../../images/cookaton.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { assign } from "lodash";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
    const { user } = useUserName();
    const navigate = useNavigate()
    const [searchForRecipes, setSearchForRecipes] = useState()
    const [inputValue, setInputValue] = useState('')
    const apiKey = '30430d7614344b1eb66b9d17e3f6d634'


    console.log("checking availability of users",user);


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

    const handleLogout = async () => {

        const auth = getAuth()
        if (user) {
            try {
                await signOut(auth)
                console.log("User signed out")
                navigate ('/login')
            } catch (error){
                console.error("Error signing out")
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

                            <h3>Recipe</h3>

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
                            user?.displayName ? 
                            <span>
                              Welcome: {user?.displayName}
                            <Link to={"/login"}>
                              <button className="contactUS" onClick={handleLogout}>sign out</button>
                            </Link>
                            </span>

                            :
                            
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