import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from "../../images/cookaton.png";
import './signup.css'; // Import the CSS file for signup page styling
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase.js';

const SignupPage = () => {
  
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [username, setUserName] = useState()



//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

  const handleSignup = async () => {

    const auth = getAuth()

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password, username);
        const user = userCredential.user;
        console.log("user is signed up", user);

        // if (user) {
        //     window.location.href = "/";
        // }

        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
        });

        console.log("User signed up and data stored:", user.uid);
    } catch (error) {
        setError(error.message);
        console.error("Error signing up:", error);
    }
  };



  return (
    <div className="signupContainer">
      <Link to="/">
        <img src={logoImg} alt="Cookaton Logo" className="logo" />
      </Link>
      <h1>Create an Account</h1>
      <form>

        <input type="text"
                placeholder='username'
                name='username'
                value={username}
                onChange={(e) =>  setUserName(e.target.value)}
                className='inputField'
                required/>

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
