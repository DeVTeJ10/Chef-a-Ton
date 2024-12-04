import { Link } from "react-router-dom";
import "./footer.css"
import logoImg from "../../images/cookaton.png";




const footer = () => {
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
            <h3>Cooking tips</h3>
            <h3>About us</h3>
        </div>
        </div>
        </div>
    </div>
  )
}

export default footer