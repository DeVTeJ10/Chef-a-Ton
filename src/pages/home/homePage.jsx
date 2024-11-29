import React from 'react';
import "./home.css"
import Header from "../../components/header/header";
import cooking1 from "../../images/cooking1.jpg";



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

        <div className='featTheRecipes1'>
        <div className='featTheRecipes'>
          <h1 className='featTheRec'> Some of our featured recipes,<br></br> you could potentially try out.</h1>
        </div>
        </div>
    </div>
  );
};

export default homepage;