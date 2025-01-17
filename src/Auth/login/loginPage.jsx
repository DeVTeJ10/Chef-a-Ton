import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from "../../images/cookaton.png";
import './login.css'; // Import the CSS file for login page styling
import { getAuth, signInWithPopup} from "firebase/auth"
import { provider } from '../../firebase';
import { useLocation } from 'react-router-dom';

const LoginPage = () => {
  
  const [users, setUser] = useState(null); // Initialize with null instead of an array
  console.log(users);

  const handleGoogleLogin = () => {


    const auth = getAuth();


    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("getting users?", user)
        setUser(user);
        window.location.href = "/";
      }).catch((error) => {
        console.error("Error during Google login:", error);
      });


  }

  return (
    <div className="loginContainer">
      <Link to="/">
        <img src={logoImg} alt="Cookaton Logo" className="logo" />
      </Link>
      <h1>Welcome to Cookaton</h1>
      <form>
        <input type="text" placeholder="Username" className="inputField" />
        <input type="password" placeholder="Password" className="inputField" />
        <div className='loginBTN'>
          <button type="button" className="loginButton">Login</button>
          <button type="button" className='loginButtons' onClick={handleGoogleLogin}>Login with Google</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;