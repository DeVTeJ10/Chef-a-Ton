import Header from "../../components/header/header"
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import streetfood from "../../images/streetfood.jpg";
import perfectiming from "../../images/perfecttime.png"
import foodserving from "../../images/foodserving.png"
import similarfood1 from "../../images/similarfood1.jpg"
import similarfood2 from "../../images/similarfood2.jpg"
import Footer from "../../components/footer/footer"
import "./recipe.css"


const recipesPage = () => {


  const [post, setPost] = useState("");
  const [similarPost, setSimilarPost] = useState("")
  const [similarPostInfo, setSimilarPostInfo] = useState("")
  const { id } = useParams();
  const { title } = useParams()
  const { recipeImage } = useParams()
  const location = useLocation();  // <== Added location for URL debugging
  const apiKey = 'c01c98e1f9ed4adfa1e886d6d8e69c2e' // Api key needed for both apis to work
  const decodeImageUrl1 = decodeURIComponent(recipeImage)





  useEffect(() => {


    if (!id) {
      console.error("No ID found in URL parameters");  // <== Handle missing or undefined ID
      return;
    }

        const fetchMoreRecipeDatas = async () => {
          try {

            if (!id) return

            const recipeDetails = await axios.get(
              `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey}`,
              {
                headers: {
                  'Content-Type': 'application/json', 
                },
              }
            );
              console.log("check this value for the ids",recipeDetails)
              // console.log(id)
              // console.log(title)
              // console.log(recipeImage)
              setPost(recipeDetails); 
              console.log("post available?",post)
            // }
          } catch (error) {
            console.error("Error:", error.message); 
          }
        };
        
  fetchMoreRecipeDatas()
  }, [id, location]);




          const fetchSimilarRecipeData = async () => {
            try {

              if (!id && !post) return

              const similarRecipe = await axios.get(
                `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${apiKey}`,
                {
                  headers: {
                    'Content-Type': 'application/json', 
                  },
                }
              );
                setSimilarPost(similarRecipe)
                if (id && similarRecipe){

                  let result = similarRecipe.data.map(obj => ({id: obj.id}));
                  console.log("IDs:", result);
                }
            } catch (error){
              console.error("Error:", error.message); 
            }
          };
          
  useEffect(() => {
    fetchSimilarRecipeData();
  }, [id, location]);




          const fetchSimilarRecipeDataExtraData = async () => {
            try {

              if (!id && !post && !similarPost) return

              const similarRecipeXData = await axios.get(
                `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${apiKey}`,
                {
                  headers: {
                    'Content-Type': 'application/json', 
                  },
                }
              );
              setSimilarPostInfo(similarRecipeXData)
            } catch (error){
              console.error("Error:", error.message); 
            }
          };
  
  useEffect(() => {
  fetchSimilarRecipeDataExtraData();
  console.log("similar recipe data",similarPostInfo)
  console.log("similar recipe post data",similarPost)
}, [id, location, similarPost]);



  return (
    <div>
      <Header/>
      <div className="firstrecipecontent">

      <div className="foodtimelapse">
      <div className="timefoodlapse">
        <h1 className="foodingrecipe">Street food varieties</h1>
        <div className="timeperfect">
        <div className="perfectime">
        <img
                src={perfectiming}
                width={40}
                height={40}
                alt="pasta"
                className="cooking2tons"
            />
            <h4>1</h4>
            <h4>Hour</h4>
        </div>
        <div className="perfectime">
        <img
                src={foodserving}
                width={40}
                height={40}
                alt="pasta"
                className="cooking2tons"
            />
            <h3>4</h3>
            <h3>Serves</h3>
        </div>
        </div>
                </div>
      </div>
        <div className="cooking2ton">
        <img
                  src={streetfood}
                  width={556}
                  height={370}
                  alt="pasta"
                  className="cooking2tonss"
              />
        </div>
        <div className="loremthekingsun">
        <div className="loremkingsun">
        <p>Lorem ipsum dolor sit amet,<br></br> consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br></br>

                Ut enim ad minim veniam,<br></br> quis nostrud exercitation,<br></br> ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. 

                Duis aute irure dolor in<br></br> reprehenderit in voluptate <br></br>
                velit esse cillum dolore eu fugiat nulla pariatur. 

                Excepteur sint occaecat<br></br> cupidatat non proident, <br></br>
                sunt in culpa qui officia deserunt mollit anim id est laborum.

                Lorem ipsum dolor sit amet,<br></br> consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

                  Ut enim ad minim veniam,<br></br> quis nostrud exercitation ullamco laboris <br></br>
                  nisi ut aliquip ex ea commodo consequat. 

                  Duis aute irure dolor in reprehenderit<br></br> in voluptate 
                  velit esse<br></br> cillum dolore eu fugiat nulla pariatur. 

                  Excepteur sint occaecat<br></br> cupidatat non proident, 
                  sunt in culpa qui officia<br></br> deserunt mollit anim id est laborum.
              </p>
        </div>
              <div className="lorempisum">
              <h2> 1. Ingredients</h2>
                <h2> 2. Equipment needed for preparation </h2>
                <h2> 3. Nutritional value</h2>
              </div>
        </div>
      </div>
      <h1 className="instructions">Instructions</h1>


    <div className="similarpiece">
    <h2 className="simrecipes">Similar recipes</h2>
    <div className="similarRecipes">
      <div className="foodCards">
        <div className="cookCardFood">
        <img
              src={similarfood1}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />
        </div>
          <div className="savouryFishs">
          <h3>Savoury herb infused fish</h3>
          <p className="indulgeFishs">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p>
          </div>

        <div className="timePrepRecipes">
          <p className="timePrep">40 Min - easy prep - 3 serves</p>
          <button className="viewRecipeBTNs">VIEW RECIPE</button>
        </div>
        </div>
        <div className="foodCards">
        <div className="cookCardFood">
        <img
              src={similarfood2}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />
        </div>
          <div className="savouryFishs">
          <h3>Savoury herb infused fish</h3>
          <p className="indulgeFishs">Indulge in the rich and savory symphony of<br></br> flavors with our Savory Herb-Infused Fish</p>
          </div>

        <div className="timePrepRecipes">
          <p className="timePrep">40 Min - easy prep - 3 serves</p>
          <button className="viewRecipeBTNs">VIEW RECIPE</button>
        </div>
        </div>
      </div>
    </div>
      <Footer/>
      </div>
  )
}

export default recipesPage