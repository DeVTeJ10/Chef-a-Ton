import React from 'react';
import logoImg from "../../images/cookaton.png";
import './login.css'; // Import the CSS file for login page styling

const LoginPage = () => {
  return (
    <div className="loginContainer">
      <img src={logoImg} alt="Cookaton Logo" className="logo" />
      <h1>Welcome to Cookaton</h1>
      <form>
        <input type="text" placeholder="Username" className="inputField" />
        <input type="password" placeholder="Password" className="inputField" />
        <button className="loginButton">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;