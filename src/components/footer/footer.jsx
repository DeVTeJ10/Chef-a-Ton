import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./footer.css"
import logoImg from "../../images/cookaton.png";
import useUserName from "../../userNameHook";
import { useEffect, useState } from "react";



const header = () => {

  const {user} = useUserName()
  const navigate = useNavigate()
  const apiKey = "f36b7e2dfdbb4961ac74f677d4a9e486"
  const [inputValue, setInputValue] = useState('')
  const [searchRecipes, setSearchRecipes] = useState()


        const searchForRecipe = async () => {
          try {
              const response = await axios.get(
                  `https://api.spoonacular.com/recipes/complexSearch?query=${inputValue}&apiKey=${apiKey}&number=30`,
                  {
                      headers: {
                          'Content-Type': 'application/json', 
                      }
                  }
              );
              const searchedResponse = response
              setSearchRecipes(searchedResponse.data.results);
              return response; // Return the full response
          } catch (error) {
              console.error("Error:", error.message);
              return null;
          }
      };



        const handleKeyPress = async (event) => {

          if (event.key === 'Enter'){
            event.preventDefault()
            const searchingRecipes = await searchForRecipe()
            if (searchingRecipes){
              navigate('/searched-page', {
                  state: {
                      searchingRecipes: searchingRecipes.data.results,
                      searchQuery: inputValue
                  }
              })
            }
          }
        } 



        useEffect(() => {

          if(searchRecipes){
            console.log("displaying searched recipes from footer link", searchRecipes)
          }
        },[searchRecipes])
  









  return (
    <div>
        <div className='heading23'>
        <div className='heading45'>
        <div className='logos1'>
            <img
            src={logoImg}
            width={80}
            height={80}
            className="cookingtons"
            alt="Villa"
        />
        </div>

        <div className="headers1">
          <Link to={"/"} className="homeTag">
              <h3>Home</h3>
            </Link>
          <Link to={"/recipe-page"} className="recipeTag">
                <h3>Recipe</h3>
            </Link>
          <Link to={"/recipe-page"} className="aboutUsTag">
                <h3>About us</h3>
              </Link>
          <Link to={"/recipe-page"} className="favouritesTag">
                <h3>Favourites</h3>
              </Link>
        </div>


        <div className="inputinup">
        <input
            placeholder='Search for recipe' 
            className='inputRecipe'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            type="text"/>
        </div>
        </div>
        </div>
    </div>
  )
}

export default header