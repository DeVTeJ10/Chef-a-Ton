import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import cooking1 from "../../images/cooking1.jpg";
import sushi from "../../images/foodsushi.jpg";
import "./home.css"
import _ from 'lodash';

const homepage = () => {

        const [randomRecipe, setRandomRecipe] = useState(""); // Handle the random api call
        const [recipeInput, setRecipeInput] = useState("")
        const [breakfastRecipes, setBreakfastRecipes] = useState([""])
        const [lunchRecipe, setLunchRecipes] = useState("")
        const [dinnerRecipe, setDinnerRecipes] = useState("")
        const [displayBreakfast, setDisplayBreakfast] = useState("")
        const [displayLunch, setDisplayLunch] = useState("")
        const [displayDinner, setDisplayDinner] = useState("")



        const apiKey = '4eb29920f4584c31a9b61ee35fc44229' // Api key needed for both apis to work


          const fetchRandomRecipeData = async () => {
            try {

              const randomRecipes = await axios.get(
                `https://api.spoonacular.com/recipes/random?number=80&apiKey=${apiKey}`,
                {
                  headers: {
                    'Content-Type': 'application/json', 
                  },
                }
              );
              const  recipesRandom = randomRecipes
              setRandomRecipe(recipesRandom); 
            } catch (error) {
              console.error("Error:", error.message); 
            }
          };
          useEffect(() => {
            if (!randomRecipe)
              fetchRandomRecipeData();
              console.log("array la recipes", randomRecipe)
          },[randomRecipe]);


          
          
          const dishTypes = () => {

            let checkrecipes = randomRecipe?.data?.recipes;

              if (checkrecipes) {

                let breakfastRecipes = checkrecipes.filter(dish => dish.dishTypes && dish.dishTypes.includes("breakfast"));
                setBreakfastRecipes(breakfastRecipes)
                console.log("Array of breakfast recipes:", breakfastRecipes);

                let lunchRecipes = checkrecipes.filter(dish => dish.dishTypes && dish.dishTypes.includes("lunch"));
                setLunchRecipes(lunchRecipes)
                console.log("Array of lunch recipes:", lunchRecipes)

                let dinnerRecipes = checkrecipes.filter(dish => dish.dishTypes && dish.dishTypes.includes("dinner"));
                setDinnerRecipes(dinnerRecipes)
                console.log("Array of dinner recipes", dinnerRecipes)

              }

        }
          useEffect(() => {
            if (!randomRecipe) return
            dishTypes()
          },[randomRecipe])



          const displayDishTypes = () => {

            if (breakfastRecipes && lunchRecipe && dinnerRecipe){

              const breakfastRecipeDisplays = _.sampleSize(breakfastRecipes, 3)
              console.log("breakfasts to display",breakfastRecipeDisplays)
              setDisplayBreakfast(breakfastRecipeDisplays)

              const lunchRecipeDisplays = _.sampleSize(lunchRecipe, 3)
              console.log("lunch to display",lunchRecipeDisplays)
              setDisplayLunch(lunchRecipeDisplays)

              const dinnerRecipeDisplays = _.sampleSize(dinnerRecipe, 3)
              console.log("dinner to display",dinnerRecipeDisplays)
              setDisplayDinner(dinnerRecipeDisplays)

            }
          }
          useEffect(() => {
            if (!randomRecipe) return
            displayDishTypes()
          },[randomRecipe, breakfastRecipes, lunchRecipe, dinnerRecipe])



            
            

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

      <div className="cardFood">
      <div className="foodCard">
        <div className="cookCardFood">
        { sushi &&
            <img src={randomRecipe?.data?.recipes[0].image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />}
        </div>
          <div className="savouryFish">
          <h3>{randomRecipe?.data?.recipes[0].title}</h3>
          <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p>
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[0].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[0].servings} serves</p>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
        </div>
        </div>

        <div>
          
        </div>
        <div className="foodCard">
        <div className="cookCardFood">
        { sushi &&
            <img src={randomRecipe?.data?.recipes[1].image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />}
        </div>
          <div className="savouryFish">
          <h3>{randomRecipe?.data?.recipes[1].title}</h3>
          <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p>
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[1].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[1].servings} serves</p>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
        </div>
        </div>
        <div className="foodCard">
        <div className="cookCardFood">
       { sushi &&
            <img src={randomRecipe?.data?.recipes[2].image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />}
        </div>
          <div className="savouryFish">
          <h3>{randomRecipe?.data?.recipes[2].title}</h3>
          <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p>
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[2].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[2].servings} serves</p>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
        </div>
        </div>
      </div>
      <div className="cardFood">
      <div className="foodCard">
        <div className="cookCardFood">
        {
          sushi &&
        <img src={randomRecipe?.data?.recipes[3].image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />}
        </div>
          <div className="savouryFish">
          <h3>{randomRecipe?.data?.recipes[3].title}</h3>
          <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p>
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[3].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[3].servings} serves</p>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
        </div>
        </div>

        <div>
          
        </div>
        <div className="foodCard">
        <div className="cookCardFood">
        {
            sushi &&
            <img src={randomRecipe?.data?.recipes[4].image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />}
        </div>
          <div className="savouryFish">
          <h3>{randomRecipe?.data?.recipes[4].title}</h3>
          <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p>
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[4].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[4].servings} serves</p>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
        </div>
        </div>

        <div className="foodCard">
        <div className="cookCardFood">
        {
          sushi &&
          <img src={randomRecipe?.data?.recipes[5].image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />
        }

        </div>
          <div className="savouryFish">
          <h3>{randomRecipe?.data?.recipes[5].title}</h3>
          <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p>
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[5].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[5].servings} serves</p>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
        </div>
        </div>
      </div>
      <div className="cardFood">
      <div className="foodCard">
        <div className="cookCardFood">
        {
          sushi &&
        <img src={randomRecipe?.data?.recipes[6].image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />}
        </div>
          <div className="savouryFish">
          <h3>{randomRecipe?.data?.recipes[6].title}</h3>
          <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p>
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[6].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[6].servings} serves</p>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
        </div>
        </div>

        <div>
          
        </div>
        <div className="foodCard">
        <div className="cookCardFood">
        {
            sushi &&
            <img src={randomRecipe?.data?.recipes[7].image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />}
        </div>
          <div className="savouryFish">
          <h3>{randomRecipe?.data?.recipes[7].title}</h3>
          <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p>
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[7].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[7].servings} serves</p>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
        </div>
        </div>

        <div className="foodCard">
        <div className="cookCardFood">
        {
          sushi &&
          <img src={randomRecipe?.data?.recipes[8].image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />
        }

        </div>
          <div className="savouryFish">
          <h3>{randomRecipe?.data?.recipes[8].title}</h3>
          <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p>
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[8].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[8].servings} serves</p>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
        </div>
        </div>
      </div>

      <div className="meals">
        <button className="breakfast">Breakfast</button>
        <button className="lunch">Lunch</button>
        <button className="dinner">Dinner</button>
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
          <h3>Savoury herb infused fish</h3>
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
          <h3>Savoury herb infused fish</h3>
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