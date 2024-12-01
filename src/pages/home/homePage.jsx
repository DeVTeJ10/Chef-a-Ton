import "./home.css"
import Header from "../../components/header/header";
import cooking1 from "../../images/cooking1.jpg";
import sushi from "../../images/foodsushi.jpg";



const homepage = () => {
  return (
    <div>
        <Header/>
        <div className='cookingteam'>
          <img
              src={cooking1}
              width={1400}
              height={400}
              className="cooking1ton"
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
        <img
              src={sushi}
              width={427}
              height={234}
              className="cooking1ton"
              alt="Villa"
          />
          <h1>Savoury herb infused fish</h1>
          <p>Indulge in the rich and savory symphony of flavors with our Savory Herb-Infused Fish</p>
          <p className="timePrep">40 Min - easy prep - 3 serves</p>
          <button className="viewRecipe">VIEW RECIPE</button>
    </div>
  );
};

export default homepage;