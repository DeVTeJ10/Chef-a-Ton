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
import { getFirestore, setDoc, addDoc, doc, collection, Firestore, getDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { app } from '../../firebase';

import useUserName from "../../userNameHook";

const Homepage = () => {

        const [randomRecipe, setRandomRecipe] = useState(""); // Holding the api data called.
        const [breakfastRecipe, setBreakfastRecipes] = useState([""]); // Holding breakfast filtered recipes.
        const [lunchRecipe, setLunchRecipes] = useState("")
        const [dinnerRecipe, setDinnerRecipes] = useState("")
        const [breakfastNumber, setBreakfastNumber] = useState("")
        const [lunchNumber, setLunchNumber] = useState("")
        const [dinnerNumber, setDinnerNumber] = useState("")
        const [isAvailable, setIsAvailable] = useState()
        const [savedRecipes, setSavedRecipes] = useState({});
        const [getId, setGetid] = useState()
        const [isSaved, setIsSaved] = useState(true)



        const { user } = useUserName();
        const userId = user?.id
        const userName = user?.displayName
        // console.log("checking for ids to save recipes on homepage",recipeIds)


        const db = getFirestore(app)



        console.log(" checking user on homepage", user)
        console.log("checking for user id", user?.uid)


        const apiKey = 'd76e5d9754a04d969338e9d1dc2d144b' // Api key needed for both apis to work




        const getRecipeId = async (id, userId, user) => {
            if (randomRecipe && user && userId) {
                setGetid(id)
                console.log("This is the id from the clicked recipe", `${id}`)
                await savingRecipes(user, randomRecipe, userId, id)
                setSavedRecipes(prev => ({
                    ...prev,
                    [id]: true
                }));
            } else {
                console.log("Please login to save recipes")
            }
        }



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






            const savingRecipes = async (user, randomRecipe, userId, getId) => {

                // const userId = user?.id

                if (!user) {
                    console.error("User is not signed in")
                    return
                }

                if (!getId) {
                    console.error("cannot get recipe id")
                    return
                }

                // Convert getId to string if it isn't already
                const recipeId = String(getId)
                
                const recCollRef = collection(db, "recipes")
                const recDocRef = doc(recCollRef, recipeId)
                const docSnap = await getDoc(recDocRef)
                setIsAvailable(docSnap)

                if (!randomRecipe) {
                    console.error("No recipe data to work with, randomRecipe is not available", randomRecipe)
                    return
                }

                // Find the specific recipe from randomRecipe.data.recipes array
                const selectedRecipe = randomRecipe.data.recipes.find(recipe => recipe.id === getId)
                
                if (!selectedRecipe) {
                    console.error("Recipe not found")
                    return
                }

                const saveRecData = {
                    name: selectedRecipe.title,
                    ingredients: selectedRecipe.extendedIngredients,
                    instructions: selectedRecipe.instructions,
                    imageUrl: selectedRecipe.image
                }

                await setDoc(recDocRef, saveRecData)
                await createUserRecipeCollection(userId, recipeId)
                setSavedRecipes(prev => ({
                    ...prev,
                    [recipeId]: true
                }));

                async function createUserRecipeCollection(userId, recipeId) {
                    if (!userId || !recipeId) {
                        console.error("Missing userId or recipeId")
                        return
                    }

                    const savedRecipesCollection = collection(db, "user_saved_recipes")
                    const savedRecipesId = `${userId}_${recipeId}`
                    const savedRecipesDocRef = doc(savedRecipesCollection, savedRecipesId)

                    const savedRecipesData = {
                        userName: userName,
                        userId: userId,
                        recipeId: recipeId,
                        recipeName: selectedRecipe.title,
                        recipeImage: selectedRecipe.image,
                        recipeIngredients: selectedRecipe.extendedIngredients || [],
                        recipeInstructions: selectedRecipe.instructions || "",
                        savedAt: serverTimestamp(),
                    }

                    try {
                        await setDoc(savedRecipesDocRef, savedRecipesData)
                        console.log("Recipe saved successfully with ID:", savedRecipesId)
                    } catch (error) {
                        console.error("Error saving recipe:", error)
                    }
                }
            }


            const deleteRecipe = async (recipeId, userId) => {
                if (!user) {
                    console.error("user is not logged in")
                    return
                }

                try {
                    const savedRecipesCollectionRef = collection(db, "user_saved_recipes")
                    const savedRecipeId = `${userId}_${recipeId}`
                    const savedRecipeDocRef = doc(savedRecipesCollectionRef, savedRecipeId)
                    
                    await deleteDoc(savedRecipeDocRef)
                    console.log("recipe deleted successfully")
                    
                    // Update local state to reflect deletion
                    setSavedRecipes(prev => ({
                        ...prev,
                        [recipeId]: false
                    }));
                } catch (error) {
                    console.error("error unsaving recipe:", error)
                }
            }


            

          
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

          { 
            !savedRecipes[randomRecipe?.data?.recipes[0]?.id] ?
            <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(randomRecipe?.data?.recipes[0]?.id, user?.uid, user)}>+</button>
          </span>

          :

           <button className="removeRecipeBTN" onClick={() => deleteRecipe(randomRecipe?.data?.recipes[0]?.id, user?.uid)}>-</button>
           }
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
          {
            !savedRecipes[randomRecipe?.data?.recipes[1]?.id] ?
            <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(randomRecipe?.data?.recipes[1]?.id, user?.uid, user)}>+</button>
          </span>
          :
          <button className="removeRecipeBTN" onClick={() => deleteRecipe(randomRecipe?.data?.recipes[1]?.id, user?.uid)}>-</button>
        }
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
          {
            !savedRecipes[randomRecipe?.data?.recipes[2]?.id] ?
            <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(randomRecipe?.data?.recipes[2]?.id, user?.uid, user)}>+</button>
          </span>
          :
          <button className="removeRecipeBTN" onClick={() => deleteRecipe(randomRecipe?.data?.recipes[2]?.id, user?.uid)}>-</button>}
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
          {
            !savedRecipes[randomRecipe?.data?.recipes[3]?.id] ?
            <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(randomRecipe?.data?.recipes[3]?.id, user?.uid, user)}>+</button>
          </span>
          :
          <button className="removeRecipeBTN" onClick={() => deleteRecipe(randomRecipe?.data?.recipes[3]?.id, user?.uid)}>-</button>}
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
          {
            !savedRecipes[randomRecipe?.data?.recipes[4]?.id] ?
            <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(randomRecipe?.data?.recipes[4]?.id, user?.uid, user)}>+</button>
          </span>
          :
          <button className="removeRecipeBTN" onClick={() => deleteRecipe(randomRecipe?.data?.recipes[4]?.id, user?.uid)}>-</button>
          }
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
          {
            !savedRecipes[randomRecipe?.data?.recipes[5]?.id] ?
            <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(randomRecipe?.data?.recipes[5]?.id, user?.uid, user)}>+</button>
          </span>
          :
          <button className="removeRecipeBTN" onClick={() => deleteRecipe(randomRecipe?.data?.recipes[5]?.id, user?.uid)}>-</button>
          }
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
          {
            !savedRecipes[randomRecipe?.data?.recipes[6]?.id] ?
            <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(randomRecipe?.data?.recipes[6]?.id, user?.uid, user)}>+</button>
          </span>
          :
          <button className="removeRecipeBTN" onClick={() => deleteRecipe(randomRecipe?.data?.recipes[6]?.id, user?.uid)}>-</button>
          }
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
          {
            !savedRecipes[randomRecipe?.data?.recipes[7]?.id] ?
            <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(randomRecipe?.data?.recipes[7]?.id, user?.uid, user)}>+</button>
          </span>
          :
          <button className="removeRecipeBTN" onClick={() => deleteRecipe(randomRecipe?.data?.recipes[7]?.id, user?.uid)}>-</button>
          }
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
          {
            !savedRecipes[randomRecipe?.data?.recipes[8]?.id] ?
            <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(randomRecipe?.data?.recipes[8]?.id, user?.uid, user)}>+</button>
          </span>
          :
          <button className="removeRecipeBTN" onClick={() => deleteRecipe(randomRecipe?.data?.recipes[8]?.id, user?.uid)}>-</button>
          }
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
          {
            !savedRecipes[breakfastNumber[0]?.id] ?
            <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(breakfastNumber[0]?.id, user?.uid, user)}>+</button>
          </span>
          :
          <button className="removeRecipeBTN" onClick={() => deleteRecipe(breakfastNumber[0]?.id, user?.uid)}>-</button>
          }
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
          {
            !savedRecipes[breakfastNumber[1]?.id] ?
            <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(breakfastNumber[1]?.id, user?.uid, user)}>+</button>
          </span>
          :
          <button className="removeRecipeBTN" onClick={() => deleteRecipe(breakfastNumber[1]?.id, user?.uid)}>-</button>
          }
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
         { 
          !savedRecipes[breakfastNumber[2]?.id] ?
          <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(breakfastNumber[2]?.id, user?.uid, user)}>+</button>
          </span>
          :
          <button className="removeRecipeBTN" onClick={() => deleteRecipe(breakfastNumber[2]?.id, user?.uid)}>-</button>}
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
          {
            !savedRecipes[lunchNumber[0]?.id] ?
            <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(lunchNumber[0]?.id, user?.uid, user)}>+</button>
          </span>
          :
          <button className="removeRecipeBTN" onClick={() => deleteRecipe(lunchNumber[0]?.id, user?.uid)}>-</button>
          }
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
          {
            !savedRecipes[lunchNumber[1]?.id] ?
            <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(lunchNumber[1]?.id, user?.uid, user)}>+</button>
          </span>
          :
          <button className="removeRecipeBTN" onClick={() => deleteRecipe(lunchNumber[1]?.id, user?.uid)}>-</button>
          }
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
          {
            !savedRecipes[lunchNumber[2]?.id] ?
            <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(lunchNumber[2]?.id, user?.uid, user)}>+</button>
          </span>
          :
          <button className="removeRecipeBTN" onClick={() => deleteRecipe(lunchNumber[2]?.id, user?.uid)}>-</button>
          }
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
          {
            !savedRecipes[dinnerNumber[0]?.id] ?
            <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(dinnerNumber[0]?.id, user?.uid, user)}>+</button>
          </span>
          :
          <button className="removeRecipeBTN" onClick={() => deleteRecipe(dinnerNumber[0]?.id, user?.uid)}>-</button>
          }
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
          {
            !savedRecipes[dinnerNumber[1]?.id] ?
            <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(dinnerNumber[1]?.id, user?.uid, user)}>+</button>
          </span>
          :
          <button className="removeRecipeBTN" onClick={() => deleteRecipe(dinnerNumber[1]?.id, user?.uid)}>-</button>
          }
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
          {
            !savedRecipes[dinnerNumber[2]?.id] ?
            <span>
          <button className="addRecipeBTN" onClick={() => getRecipeId(dinnerNumber[2]?.id, user?.uid, user)}>+</button>
          </span>
          :
          <button className="removeRecipeBTN" onClick={() => deleteRecipe(dinnerNumber[2]?.id, user?.uid)}>-</button>
          }
        </div>
        </div>
      </div>

    {
      user?.displayName ?

      <div className='welcomeUser'>
        <h1>Once again, we say welcome: </h1>
          <h1> {user.displayName}</h1>
      </div>
    :

    <span>
        <div className="railHeal">
          <div className="healthyRailing">
            <h1>Save more from the Healthy Train now</h1>
            <h3 className="railAway"> its mearly a rail away, <a href="/login">login</a> or <a href="/signup">signup</a> to save more recipes</h3>
          </div>
        </div>
    </span>

    
    }
    <Footer/>
    </div>
  );
};

export default Homepage;