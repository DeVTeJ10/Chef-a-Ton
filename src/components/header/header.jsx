import { Link } from "react-router-dom";
import "./header.css"
import logoImg from "../../images/cookaton.png";




const header = () => {
  return (
    <div>
        <div className='heading2'>
        <div className='heading'>
        <div className='logos'>
            <img
            src={logoImg}
            width={80}
            height={80}
            className="cookingtons"
            alt="Villa"
        />
        </div>
        <div className="headers">
        <Link to={"/"}>
            <h3>Home</h3>
          </Link>
          <Link to={"/recipe-page/:id"}>
            <h3>Recipe</h3>
            </Link>
        </div>
        <input
        placeholder='Search for recipe' 
        className='inputRecipe'/>
        <button>Login</button>
        <button>Sign up</button>
        </div>
        </div>
    </div>
  )
}

export default header