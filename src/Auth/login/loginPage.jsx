import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from "../../images/cookaton.png";
import './login.css'; // Import the CSS file for login page styling

const LoginPage = () => {
  return (
    <div className="loginContainer">
        <Link to = {"/"}>
      <img src={logoImg} alt="Cookaton Logo" className="logo" />
      </Link>
      <h1>Welcome to Cookaton</h1>
      <form>
        <input type="text" placeholder="Username" className="inputField" />
        <input type="password" placeholder="Password" className="inputField" />
    <div className='loginBTN'>
        <button className="loginButton">Login</button>
    </div>
      </form>
    </div>
  );
};

export default LoginPage;