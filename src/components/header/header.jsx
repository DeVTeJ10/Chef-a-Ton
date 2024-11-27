import React from 'react'
import "./header.css"
// import logoImg from "../../images/cookaton.png";




const header = () => {
  return (
    <div>
        <div className="headers">
        {/* <img
        src={logoImg}
        width={80}
        height={80}
        className="cottage"
        alt="Villa"
      /> */}
            <h3>Home</h3>
            <h3>Recipe</h3>
            <h3>Cooking tips</h3>
            <h3>About us</h3>
        </div>
    </div>
  )
}

export default header