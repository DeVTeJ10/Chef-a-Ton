import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/home/homePage";
import RecipePage from "./pages/recipe/recipePage";
// import AboutUsPage from 
import './input.css'




function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/recipe-page" element={<RecipePage/>} />
        {/* <Route path="/about-us" element={<AboutUsPage/>} />
        <Route path="/services-page" element={<ServicesPage/>} /> */}
      </Routes>
    </>
  )
}

export default App
