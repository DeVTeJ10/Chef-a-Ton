import { Link } from "react-router-dom";
import "./footer.css"
import logoImg from "../../images/cookaton.png";




const header = () => {
  return (
    <div>
        <div className='heading23'>
        <div className='heading45'>
        <div className='logos1'>
            <img
            src={logoImg}
            width={80}
            height={80}
            className="cookingtons"
            alt="Villa"
        />
        </div>
        <div className="headers1">
          <Link to={"/"} className="homeTag">
              <h3>Home</h3>
            </Link>
          <Link to={"/recipe-page"} className="recipeTag">
                <h3>Recipe</h3>
            </Link>
          <Link to={"/recipe-page"} className="aboutUsTag">
                <h3>About us</h3>
              </Link>
          <Link to={"/recipe-page"} className="favouritesTag">
                <h3>Favourites</h3>
              </Link>
        </div>

        <div className="inputinup">
        <input
        placeholder='Search for recipe' 
        className='inputRecipe'/>
        </div>
        </div>
        </div>
    </div>
  )
}

export default header