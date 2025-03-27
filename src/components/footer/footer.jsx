import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./footer.css"
import logoImg from "../../images/cookaton.png";
import { useEffect, useState } from "react";



const header = () => {


  const navigate = useNavigate()
  const apiKey = "edded284742f42ebabb9523442416398"
  const [inputValues, setInputValue] = useState('')
  const [searchRecipes, setSearchRecipes] = useState()


        const searchForRecipe = async () => {
          try {
              const responses = await axios.get(
                  `https://api.spoonacular.com/recipes/complexSearch?query=${inputValues}&apiKey=${apiKey}&number=30`,
                  {
                      headers: {
                          'Content-Type': 'application/json', 
                      }
                  }
              );
              const searchedResponse = responses
              setSearchRecipes(searchedResponse.data.results);
              return responses; // Return the full response
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
                      searchQuery: inputValues
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
          <Link to={"/recipe-page"} className="aboutUsTag">
                <h3>About us</h3>
              </Link>
          <Link to={"/savedrecipes-page"} className="favouritesTag">
                <h3>Favourites</h3>
              </Link>
        </div>


        <div className="inputinup">
        <input
            placeholder='Search for recipe' 
            className='inputRecipe'
            value={inputValues}
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