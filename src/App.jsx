import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/home/homePage";
import RecipePage from "./pages/recipe/recipePage";
import LoginPage from "./Auth/login/loginPage"
import SignupPage from "./Auth/signup/signupPage"
// import AboutUsPage from "./"
import './input.css'




function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/recipe-page/:id/:title" element={<RecipePage/>} />
        {/* <Route path="/about-us" element={<AboutUsPage/>} /> */}
        {/* <Route path="/services-page" element={<ServicesPage/>} />  */}
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
    </>
  )
}

export default App
