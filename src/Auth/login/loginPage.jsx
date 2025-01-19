import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from "../../images/cookaton.png";
import './login.css'; // Import the CSS file for login page styling
import { getAuth, signInWithPopup, signInWithEmailAndPassword} from "firebase/auth"
import { provider } from '../../firebase';

const LoginPage = () => {
  
  const [users, setUser] = useState(null); // Initialize with null instead of an array

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(users);

  const handleGoogleLogin = () => {

    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("getting users?", user)
        setUser(user);

        // if(user){
        //     window.location.href = "/";
        // }

      }).catch((error) => {
        console.error("Error during Google login:", error);
      });

  }


  const handleEmailPasswordLogin = () =>{

    const auth = getAuth()

    signInWithEmailAndPassword(auth, email, password )
    .then((result) => {
        const user = result.user;
        if(user){
            window.location.href="/"
        }
        console.log("getting user with email not gmail yeah?", user)
    }).catch((error) => {
        console.log("Error during email login", error)
    })
  }

  return (
    <div className="loginContainer">
      <Link to="/">
        <img src={logoImg} alt="Cookaton Logo" className="logo" />
      </Link>
      <h1>Welcome to Cookaton</h1>
      <form>
        <input 
                type="email" 
                placeholder="email" 
                className="inputField" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" 
                placeholder="Password" 
                className="inputField" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>


        <div className='loginBTN'>

          <button type="button" 
          className="loginButton" 
          onClick={handleEmailPasswordLogin}>Login</button>

          <button type="button" 
          className='loginButtons' 
          onClick={handleGoogleLogin}>Login with Google</button>

        </div>
      </form>
    </div>
  );
};

export default LoginPage;