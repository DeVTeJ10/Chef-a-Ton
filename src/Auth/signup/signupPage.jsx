import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from "../../images/cookaton.png";
import './signup.css'; // Import the CSS file for signup page styling
import { createUserWithEmailAndPassword, getAuth, updateProfile, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { provider } from '../../firebase.js';
import { Navigate } from 'react-router-dom';

const SignupPage = () => {
  
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [username, setUserName] = useState()
  const [user, setUser] = useState()
  const navigate = useNavigate()

  const auth = getAuth()




  const handleSignup = async () => {

    console.log("signup button called")


    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password, username);
        const user = userCredential.user;
        
        await updateProfile(user, { displayName: username})
        console.log("user is signed up", user);
        console.log("checking if user display name is showing?", user.displayName)

        if (user) {
            window.location.href = "/";
        }

        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
        });
        if(userCredential){
          console.log("User signed up and data stored:", user.uid, user.displayName);
          const userId = user.displayName
        }
    } catch (error) {
        console.error(error.message);
        console.error("Error signing up:", error);
    }

  };


        const handleGoogleSignup = () => {

          signInWithPopup( provider, auth) 
          .then((result) => {
            const user = result.user

            if(user){
              console.log("signed up user", user)
              setUser(user)
              window.location.href = "/";
            }
          }).catch((error) => {
            console.error("Error during Google login:", error);
          });
        }




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
        <button type='button' className="signupButton" onClick={handleGoogleSignup}>Sign up with Gmail</button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
