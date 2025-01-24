import { Link } from "react-router-dom";
import useUserName from "../../userNameHook";
import { useParams } from "react-router-dom";
import "./header.css"
import logoImg from "../../images/cookaton.png";
import { useState } from "react";
import axios from "axios";

const Header = () => {
    const { user } = useUserName();
    console.log(user);


    const searchRecipe = async () => {

      try{

        const searchRecipe = await axios.get(``)

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
                        </div>
                    </div>

                    <div className="inputinup">
                        <input
                            placeholder='Search for recipe' 
                            className='inputRecipe'
                            type="text"/>

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