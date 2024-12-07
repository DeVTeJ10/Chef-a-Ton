import Header from "../../components/header/header"
import pasta from "../../images/pasta.jpg";
import "./recipe.css"


const recipesPage = () => {
  return (
    <div>
      <Header/>
      <div className="foodingrecipe">
          <h1>Tomato Pasta and Sauce</h1>
      </div>

          <img
                  src={pasta}
                  width={600}
                  height={400}
                  className="cooking2ton"
                  alt="pasta"
              />
      </div>
  )
}

export default recipesPage