import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from "../../images/cookaton.png";
import './signup.css'; // Import the CSS file for signup page styling
import { useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignupPage = () => {
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = () => {
    // Add signup logic here
  };

  return (
    <div className="signupContainer">
      <Link to="/">
        <img src={logoImg} alt="Cookaton Logo" className="logo" />
      </Link>
      <h1>Create an Account</h1>
      <form>
        <input type="text" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} className="inputField" />
        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} className="inputField" />
        <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="inputField" />
        <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleInputChange} className="inputField" />

        <div className='signupBTN'>

        <button type="button" className="loginButton" onClick={handleSignup}></button>
        <button type="button" className="signupButton" onClick={handleSignup}>Sign Up</button>
            
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
