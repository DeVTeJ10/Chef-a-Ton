import Header from "../../components/header/header"
import streetfood from "../../images/streetfood.jpg";
import perfectiming from "../../images/perfecttime.png"
import foodserving from "../../images/foodserving.png"
import "./recipe.css"


const recipesPage = () => {
  return (
    <div>
      <Header/>
      <div className="firstrecipecontent">
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
        <div className="cooking2ton">
        <img
                  src={streetfood}
                  width={1400}
                  height={500}
                  alt="pasta"
                  className="cooking2tons"
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
      </div>
  )
}

export default recipesPage