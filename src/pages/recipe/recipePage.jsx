import Header from "../../components/header/header"
import streetfood from "../../images/streetfood.jpg";
import perfectiming from "../../images/perfecttime.png"
import foodserving from "../../images/foodserving.png"
import "./recipe.css"


const recipesPage = () => {
  return (
    <div>
      <Header/>
      <div>
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
              <h3>1</h3>
              <h3>Hour</h3>
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
      </div>
      </div>
  )
}

export default recipesPage