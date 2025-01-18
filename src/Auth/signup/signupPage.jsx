import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from "../../images/cookaton.png";
import './signup.css'; // Import the CSS file for signup page styling
import { useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { provider } from '../../firebase';
import { getAuth } from 'firebase/auth';

const SignupPage = () => {
  
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()



//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

  const handleSignup = () => {

    const auth = getAuth()

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            console.log("user is signed up", user)
        })
    // Add signup logic here
  };

  return (
    <div className="signupContainer">
      <Link to="/">
        <img src={logoImg} alt="Cookaton Logo" className="logo" />
      </Link>
      <h1>Create an Account</h1>
      <form>
        <input type="email" 
        placeholder="email" 
        name="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="inputField" 
        required/>

        <input type="password" 
        placeholder="password" 
        name="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className="inputField" 
        required/>

        <div className='signupBTN'>
        <button type="button" className="signupButton" onClick={handleSignup}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
