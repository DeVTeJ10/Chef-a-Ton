import Header from "../../components/header/header"
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import streetfood from "../../images/streetfood.jpg";
import perfectiming from "../../images/perfecttime.png"
import foodserving from "../../images/foodserving.png"
import similarfood1 from "../../images/similarfood1.jpg"
import similarfood2 from "../../images/similarfood2.jpg"
import sushi from "../../images/foodsushi.jpg";
import Footer from "../../components/footer/footer"
import "./recipe.css"


const recipesPage = () => {


  const [post, setPost] = useState("");
  const [postInfo, setPostInfo] = useState("")
  const [similarPost, setSimilarPost] = useState("")
  const [similarPostInfo, setSimilarPostInfo] = useState("")
  const { id } = useParams();
  const [ids, setNewIds] = useState([])
  const { title } = useParams()
  // const { recipeImage } = useParams()
  const location = useLocation();  // <== Added location for URL debugging
  const apiKey = 'ad501590243a4ad2951d9582a731d140' // Updated API key


  const urlParams = new URLSearchParams();
  urlParams.append('apiKey', apiKey);
  urlParams.append('ids', ids.join(','));



  // const decodeImageUrl1 = decodeURIComponent(recipeImage)





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

                  let result = similarRecipe?.data?.map(obj => ( {id: obj.id}));
                  const flattenIds = result.filter(idds => idds.id).map(idds => idds.id)
                  const ideas = flattenIds
                  setNewIds(ideas)
                  console.log("IDs:", ideas);
                  
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
              if (!ids && !post && !similarPost) return;

              const similarRecipeXData = await axios.get(
                `https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=${apiKey}`,
                {
                  headers: {
                    'Content-Type': 'application/json', 
                  },
                }
              );
                setSimilarPostInfo(similarRecipeXData);
            } catch (error) {
              console.error("Error:", error.message); 
            }
          };
  
  useEffect(() => {

    if(ids && similarPost, id && post){
      fetchSimilarRecipeDataExtraData();
    }
}, [id, location, similarPost, ids, post]);



          const fetchRecipeInformation = async () => {
            try {
              if (!id && !post) return;

              const recipeInfo = await axios.get(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,
                {
                  headers: {
                    'Content-Type': 'application/json', 
                  },
                }
              );
                setPostInfo(recipeInfo);
            } catch (error) {
              console.error("Error:", error.message); 
            }
          };

  useEffect(() => {

    if( id && post){
      fetchRecipeInformation();
      console.log("bad man getting the info yeah?", postInfo)
    }
  }, [id, location, post, ]);



console.log("idea guy",similarPostInfo)
console.log("bad man getting the postinfo yeah?", postInfo)
console.log("post available?",post)
console.log("similar post info", similarPost)

  return (
    <div>
      <Header/>
      <div className="firstrecipecontent">

      <div className="foodtimelapse">
      <div className="timefoodlapse">
        <h1 className="foodingrecipe">{postInfo?.data?.title}</h1>
        <div className="timeperfect">
        <div className="perfectime">
        <img
                src={perfectiming}
                width={40}
                height={40}
                alt="pasta"
                className="cooking2tons"
            />
            <h4>{postInfo?.data?.readyInMinutes}</h4>
            <h4>Mins</h4>
        </div>
        <div className="perfectime">
        <img
                src={foodserving}
                width={40}
                height={40}
                alt="pasta"
                className="cooking2tons"
            />
          <h3>{postInfo?.data?.servings}</h3>
            <h3>Servings</h3>
        </div>
        </div>
                </div>
      </div>
        <div className="cooking2ton">
        { sushi &&
            <img src={postInfo?.data?.image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />}
        </div>
        <div className="loremthekingsun">
        <div className="loremkingsun">
        <p>
          {postInfo?.data?.summary}
              </p>
        </div>
              <div className="equipIngr">
                <div>
                  <h2 className="">Ingredients:</h2>
                    <p>{postInfo?.data?.extendedIngredients?.map((ingredients) => (
                      <li key={ingredients?.id}>
                        {ingredients?.name}
                      </li>
                    ))}</p>
                  
                </div>
                <div>
                <h2>Equipments: </h2>
                <p>{postInfo?.data?.analyzedInstructions?.[0]?.steps?.map((equipments) => (
                  <li key={equipments.equipment[0]?.id}>
                    {equipments?.equipment[0]?.name}
                  </li>
                ))}</p>
                
                </div>
              </div>
        </div>
      </div>

      <div className="insructionSteps">
      <h1 className="instructions">Instructions</h1>
      <p>{post?.data?.[0]?.steps?.map((instructions) => (
        <li key={instructions?.number}>
            {instructions?.step}
        </li>
      ))}</p>
      </div>
      


    <div className="similarpiece">
    <h2 className="simrecipes">Similar recipes</h2>
    <div className="similarRecipes">
      <div className="foodCards">
        <div className="cookCardFood">
        { sushi &&
            <img src={similarPostInfo?.data?.[0]?.image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />}
        </div>
          <div className="savouryFishs">
          <h3>{similarPostInfo?.data?.[0]?.title}</h3>
          <p className="indulgeFishs">{similarPostInfo?.data?.[0]?.readyInMinutes}Min - easy prep - {similarPostInfo?.data?.[0]?.servings}</p>
          </div>

        <div className="timePrepRecipes">
          <p className="timePrep">40 Min - easy prep - 3 serves</p>
          <Link to={`/recipe-page/${similarPostInfo[0]?.id}/${similarPostInfo[0]?.title}`}>
          <button className="viewRecipeBTNs">VIEW RECIPE</button>
          </Link>
        </div>
        </div>
        <div className="foodCards">
        <div className="cookCardFood">
        { sushi &&
            <img src={similarPostInfo?.data?.[1]?.image}
              width={350}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />}
        </div>
          <div className="savouryFishs">
          <h3>{similarPostInfo?.data?.[1]?.title}</h3>
          <p className="indulgeFishs"> {similarPostInfo?.data?.[1]?.readyInMinutes}Min - easy prep - {similarPostInfo?.data?.[1]?.servings}</p>
          </div>

        <div className="timePrepRecipes">
          <p className="timePrep">40 Min - easy prep - 3 serves</p>
          <Link to={`/recipe-page/${similarPostInfo[1]?.id}/${similarPostInfo[1]?.title}`}>
          <button className="viewRecipeBTNs">VIEW RECIPE</button>
          </Link>
        </div>
        </div>
      </div>
    </div>
      <Footer/>
      </div>
  )
}

export default recipesPage