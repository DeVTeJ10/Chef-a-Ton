import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/home/homepage";
import RecipePage from "./pages/recipe/recipePage";
import LoginPage from "./Auth/login/loginPage"
import SignupPage from "./Auth/signup/signupPage"
import SearchedRecipePage from "./pages/searched/searchRecipes"
import SavedRecipes from "./pages/savedRecipes/savedRecipes"
import HowTo from "./pages/how/howTo"
import './input.css'




function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/recipe-page/:id/:title" element={<RecipePage/>} />
        <Route path="/searched-page" element={<SearchedRecipePage/>} />
        <Route path="/savedrecipes-page" element={<SavedRecipes/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/how-to" element={<HowTo/>}/>
      </Routes>
    </>
  )
}

export default App
