import React from 'react'
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
            width={150}
            height={150}
            className="cookingtons"
            alt="Villa"
        />
        </div>
        <div className="headers">
            <h3>Home</h3>
            <h3>Recipe</h3>
            <h3>Cooking tips</h3>
            <h3>About us</h3>
        </div>
        <input
        placeholder='Input recipe' 
        className='inputRecipe'></input>
        </div>
        </div>
    </div>
  )
}

export default header