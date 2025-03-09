import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import cooking1 from "../../images/cooking1.jpg";
import sushi from "../../images/foodsushi.jpg";
import "./home.css"
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { getFirestore, setDoc, addDoc, doc, collection, Firestore, getDoc } from 'firebase/firestore';

import useUserName from "../../userNameHook";




const homepage = () => {

        const [randomRecipe, setRandomRecipe] = useState(""); // Holding the api data called.
        const [breakfastRecipe, setBreakfastRecipes] = useState([""]); // Holding breakfast filtered recipes.
        const [lunchRecipe, setLunchRecipes] = useState("")
        const [dinnerRecipe, setDinnerRecipes] = useState("")
        const [breakfastNumber, setBreakfastNumber] = useState("")
        const [lunchNumber, setLunchNumber] = useState("")
        const [dinnerNumber, setDinnerNumber] = useState("")


        const { user } = useUserName();
        // const db = Firestore(app)



        console.log(" checking user on homepage", user)
        console.log("checking for user id", user.uid)


        const apiKey = '58a951ee706e4d3e8c06d6b9b366e046' // Api key needed for both apis to work


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

                let lunchRecipes = checkrecipes.filter(dish => dish.dishTypes && dish.dishTypes.includes("lunch"));
                setLunchRecipes(lunchRecipes)

                let dinnerRecipes = checkrecipes.filter(dish => dish.dishTypes && dish.dishTypes.includes("side dish"));
                setDinnerRecipes(dinnerRecipes)

              }
        }
          useEffect(() => {
            if (!randomRecipe) return
            dishTypes()
          },[randomRecipe])



          const numberDishTypes = () => {

            if (breakfastRecipe && lunchRecipe && dinnerRecipe){

              const breakfastRecipeDisplays = _.sampleSize(breakfastRecipe, 3)
              setBreakfastNumber(breakfastRecipeDisplays)

              const lunchRecipeDisplays = _.sampleSize(lunchRecipe, 3)
              setLunchNumber(lunchRecipeDisplays)

              const dinnerRecipeDisplays = _.sampleSize(dinnerRecipe, 3)
              setDinnerNumber(dinnerRecipeDisplays)
               
            }
          }
          useEffect(() => {
            if (!randomRecipe) return
              numberDishTypes()
          },[randomRecipe, breakfastRecipe, lunchRecipe, dinnerRecipe])




          const changeBreakfast = async () => {

              if (!randomRecipe) return

              const datatyped = await randomRecipe

              if(datatyped){
              const breakfastRecipeDisplays = _.sampleSize(breakfastRecipe, 3)
              setBreakfastNumber(breakfastRecipeDisplays)

              }
          };


          const changeLunch = async () => {

            if (!randomRecipe) return

            const datatyped = await randomRecipe

            if(datatyped){
              const lunchRecipeDisplays = _.sampleSize(lunchRecipe, 3)
              setLunchNumber(lunchRecipeDisplays)

            }
        };


          const changeDinner = async () => {

            if (!randomRecipe) return

            const datatyped = await randomRecipe

            if(datatyped){
              const dinnerRecipeDisplays = _.sampleSize(dinnerRecipe, 3)
              setDinnerNumber(dinnerRecipeDisplays)

            }
        };


        

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
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[0].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[0].servings} serves</p>
          <Link to={`/recipe-page/${randomRecipe?.data?.recipes[0]?.id}/
              ${randomRecipe?.data?.recipes[0]?.title}`}>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
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
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[1].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[1].servings} serves</p>
          <Link to={`/recipe-page/${randomRecipe?.data?.recipes[1]?.id}/
          ${randomRecipe?.data?.recipes[1]?.title}}` }>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
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
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[2].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[2].servings} serves</p>
          <Link to={`/recipe-page/${randomRecipe?.data?.recipes[2]?.id}/
          ${randomRecipe?.data?.recipes[2]?.title}}` }>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
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
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[3].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[3].servings} serves</p>
          <Link to={`/recipe-page/${randomRecipe?.data?.recipes[3]?.id}/
          ${randomRecipe?.data?.recipes[3]?.title}}` }>`
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
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
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[4].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[4].servings} serves</p>
          <Link to={`/recipe-page/${randomRecipe?.data?.recipes[4]?.id}/
          ${randomRecipe?.data?.recipes[4]?.title}}` }>` 
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
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
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[5].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[5].servings} serves</p>
          <Link to={`/recipe-page/${randomRecipe?.data?.recipes[5]?.id}/
           ${randomRecipe?.data?.recipes[5]?.title}}` }>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
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
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[6].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[6].servings} serves</p>
          <Link to={`/recipe-page/${randomRecipe?.data?.recipes[6]?.id}/
           ${randomRecipe?.data?.recipes[6]?.title}}` }>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
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
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[7].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[7].servings} serves</p>
          <Link to={`/recipe-page/${randomRecipe?.data?.recipes[7]?.id}/
           ${randomRecipe?.data?.recipes[7]?.title}}`  }>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
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
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">{randomRecipe?.data?.recipes[8].readyInMinutes}Min - easy prep - {randomRecipe?.data?.recipes[8].servings} serves</p>
          <Link to={`/recipe-page/${randomRecipe?.data?.recipes[8]?.id}/
           ${randomRecipe?.data?.recipes[8]?.title}}`}>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
        </div>
        </div>
      </div>

      <div className="meals">
        <button className="breakfast" id='breakfastBTN' onClick={changeBreakfast}>Breakfast</button>
        <p>Some energy to start the day, dont you think?</p>
        </div>


      <div className="cardFood">
      <div className="foodCard">
        <div className="cookCardFood">
        {
          sushi &&
          <img src={breakfastNumber[0]?.image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />
        }
        </div>
          <div className="savouryFish">
          <h3 id='dishtitle1'>{breakfastNumber[0]?.title}</h3>
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">40 Min - easy prep - 3 serves</p>
          <Link to={`/recipe-page/${breakfastNumber[0]?.id}/
           ${breakfastNumber[0]?.title}}`}>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
        </div>
        </div>

        <div>
          
        </div>
        <div className="foodCard">
        <div className="cookCardFood">
        {
          sushi &&
          <img src={breakfastNumber[1]?.image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />
        }
        </div>
          <div className="savouryFish">
          <h3>{breakfastNumber[1]?.title}</h3>
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">40 Min - easy prep - 3 serves</p>
          <Link to={`/recipe-page/${breakfastNumber[1]?.id}/
          ${breakfastNumber[1]?.title}}` }>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
        </div>
        </div>
        <div className="foodCard">
        <div className="cookCardFood">
        {
          sushi &&
          <img src={breakfastNumber[2]?.image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />
        }
        </div>
          <div className="savouryFish">
          <h3>{breakfastNumber[2]?.title}</h3>
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">40 Min - easy prep - 3 serves</p>
          <Link to={`/recipe-page/${breakfastNumber[2]?.id}/
          ${breakfastNumber[2]?.title}}`}>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
        </div>
        </div>
      </div>


      <div className='lunchbtn'>
        <button className="lunch" id='lunchBTN' onClick={changeLunch}>Lunch</button>
        <p>Little more to power through the day</p>
      </div>

      <div className="cardFood">
      <div className="foodCard">
        <div className="cookCardFood">
        {
          sushi &&
          <img src={lunchNumber[0]?.image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />
        }
        </div>
          <div className="savouryFish">
          <h3 id='dishtitle1'>{lunchNumber[0]?.title}</h3>
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">40 Min - easy prep - 3 serves</p>
          <Link to={`/recipe-page/${lunchNumber[0]?.id}/
          ${lunchNumber[0]?.title}}`}>`
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
        </div>
        </div>

        <div>
          
        </div>


        <div className="foodCard">
        <div className="cookCardFood">
        {
          sushi &&
          <img src={lunchNumber[1]?.image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />
        }
        </div>
          <div className="savouryFish">
          <h3>{lunchNumber[1]?.title}</h3>
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">40 Min - easy prep - 3 serves</p>
          <Link to={`/recipe-page/${lunchNumber[1]?.id}/
          ${lunchNumber[1]?.title}}`}>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
        </div>
        </div>
        <div className="foodCard">
        <div className="cookCardFood">
        {
          sushi &&
          <img src={lunchNumber[2]?.image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />
        }
        </div>
          <div className="savouryFish">
          <h3>{lunchNumber[2]?.title}</h3>
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">40 Min - easy prep - 3 serves</p>
          <Link to={`/recipe-page/${lunchNumber[2]?.id}/
          ${lunchNumber[2]?.title}}`}>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
        </div>
        </div>
      </div>

      <div className='dinnerbtn'>
        <button className="dinner" id='dinnerBTN' onClick={changeDinner}>Dinner</button>
        <p> A light refreshment before bedtime might be needed</p>
      </div>

      <div className="cardFood">
      <div className="foodCard">
        <div className="cookCardFood">
        {
          sushi &&
          <img src={dinnerNumber[0]?.image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />
        }
        </div>
          <div className="savouryFish">
          <h3 id='dishtitle1'>{dinnerNumber[0]?.title}</h3>
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">40 Min - easy prep - 3 serves</p>
          <Link to={`/recipe-page/${dinnerNumber[0]?.id}/
          ${dinnerNumber[0]?.title}}`}>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
        </div>
        </div>

        <div>
          
        </div>
        <div className="foodCard">
        <div className="cookCardFood">
        {
          sushi &&
          <img src={dinnerNumber[1]?.image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />
        }
        </div>
          <div className="savouryFish">
          <h3>{dinnerNumber[1]?.title}</h3>
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">40 Min - easy prep - 3 serves</p>
          <Link to={`/recipe-page/${dinnerNumber[1]?.id}/
          ${dinnerNumber[1]?.title}}`}>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
        </div>
        </div>
        <div className="foodCard">
        <div className="cookCardFood">
        {
          sushi &&
          <img src={dinnerNumber[2]?.image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />
        }
        </div>
          <div className="savouryFish">
          <h3>{dinnerNumber[2]?.title}</h3>
          {/* <p className="indulgeFish">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p> */}
          </div>

        <div className="timePrepRecipe">
          <p className="timePrep">40 Min - easy prep - 3 serves</p>
          <Link to={`/recipe-page/${dinnerNumber[2]?.id}/
          ${dinnerNumber[2]?.title}}`}>
          <button className="viewRecipeBTN">VIEW RECIPE</button>
          </Link>
          <button className="addRecipeBTN" onClick={() => {/* Add functionality here later */}}>+</button>
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