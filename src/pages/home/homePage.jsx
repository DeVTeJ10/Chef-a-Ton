import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import cooking1 from "../../images/cooking1.jpg";
import sushi from "../../images/foodsushi.jpg";
import "./home.css"





const homepage = () => {

        const [randomRecipe, setRandomRecipe] = useState(""); // Handle the random api call
        const [recipeInput, setRecipeInput] = useState("")


        const apiKey = '777f35740b9843339bcbd6fba66f28f0' // Api key needed for both apis to work



          // const handleSubmit = (e) => {
          //   e.preventDefault();
          //   fetchRandomRecipeData();
          // };
          // const handleChange = (e) => {
          //   setRecipeInput(e.target.value);  // Update state with input value
          // };


          const fetchRandomRecipeData = async () => {
            try {
              console.log("random recipe API is being called");
          
              const apiKey = "777f35740b9843339bcbd6fba66f28f0";
          
              // Axios GET request with headers
              const randomRecipe = await axios.get(
                `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`, // Corrected URL structure
                {
                  headers: {
                    'Content-Type': 'application/json', // Added the header
                  },
                }
              );
          
              setRandomRecipe(randomRecipe?.data?.recipes); // Accessed .data for the response
              console.log(randomRecipe);
            } catch (error) {
              console.error("Error:", error.message); // Updated error handling
            }
          };
          
          useEffect(() => {
            fetchRandomRecipeData();
          }, []); // Added empty dependency array
          



      //   const fetchAllApis = async () => {
      //     Promise.all([fetchRandomRecipeData()])
      //     .then (([response1])  => {
      //             console.log('Data from 1st api:', response1);
      //             setRandomRecipe(response1.recipes)
      //             console.log(randomRecipe)
      //     })
      //         .catch(error => {
      //             console.error('Error', error)
      //         })
      // }
      //         useEffect(() => {
      //              {  // Only fetch data if there's input
      //               fetchAllApis()
      //             }
      //         }, [recipeInput]);




  return (
    <div>
        <Header/>
        <div className='cookingteam'>
          <img
              src={cooking1}
              width={1400}
              height={400}
              className="cookingteamton"
              alt="Villa"
          />
        </div>

        <div className="recipeQuoteLink">

        <div className='featTheRecipes1'>
          <h1 className='featTheRecipes'> Some of our featured recipes,<br></br> you could potentially try out.</h1>
        </div>
        </div>
        <p className="healthWealth">Health is wealth they say yeah?, so have a Ton of recipe in your pocket.</p>

        <div className="meals">
        <h4 className="breakfast">Breakfast</h4>
        <h4 className="lunch">Lunch</h4>
        <h4 className="dinner">Dinner</h4>
        </div>


      <div className="cardFood">
      <div className="foodCard">
        <div className="cookCardFood">
        <img
              src={sushi}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />
        </div>
          <div className="savouryFish">
          <h3>Savoury herb infused fish</h3>
          <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p>
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">40 Min - easy prep - 3 serves</p>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
        </div>
        </div>

        <div>
          
        </div>
        <div className="foodCard">
        <div className="cookCardFood">
        <img
              src={sushi}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />
        </div>
          <div className="savouryFish">
          <h3>{}</h3>
          <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p>
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">40 Min - easy prep - 3 serves</p>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
        </div>
        </div>
        <div className="foodCard">
        <div className="cookCardFood">
        <img
              src={sushi}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />
        </div>
          <div className="savouryFish">
          <h3>{randomRecipe?.recipes?.[0]?.title}</h3>
          <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p>
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">40 Min - easy prep - 3 serves</p>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
        </div>
        </div>
      </div>

    <div className="railHeal">
      <div className="healthyRailing">
          <h1>Save more from the Healthy Train now</h1>
          <h3 className="railAway"> its mearly a rail away, <a href="https://example.com">login</a> or <a href="https://example.com">signup</a> to save more recipes</h3>
        </div>
    </div>
    <Footer/>
    </div>
  );
};

export default homepage;