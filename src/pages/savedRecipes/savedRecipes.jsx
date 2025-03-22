import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, setDoc, addDoc, doc, collection, getDoc, query, where, getDocs } from 'firebase/firestore';
import Header from "../../components/header/header"
import logoImg from "../../images/cookaton.png";
import useUserName from "../../userNameHook";
import "./savedRecipes.css"
import { app } from "../../firebase";

const SavedRecipesPage = () => {

    const [displaySavedRecipes, setdisplaySavedRecipes] = useState()
    const { user } = useUserName();
    const userId = user.uid;

    const db = getFirestore(app);

    
    async function getSavedRecipes(user, userId) {
      if (!userId) {
        console.error("User is not logged in.");
        return [];
      }

      try {
        console.log("Starting query for userId:", userId);
        const savedRecipesCollectionRef = collection(db, "user_saved_recipes");
        
        // Log the collection reference
        console.log("Collection ref:", savedRecipesCollectionRef.path);
        
        const q = query(savedRecipesCollectionRef);  // First try without where clause
        const querySnapshot = await getDocs(q);
        
        // Log all documents to see what we're getting
        querySnapshot.forEach(doc => {
          console.log("Document:", doc.id, doc.data());
        });

        // Filter client-side first to debug
        const savedRecipes = querySnapshot.docs
          .map(doc => doc.data())
          .filter(data => data.userId === userId);
        
        console.log("Filtered recipes:", savedRecipes);
        setdisplaySavedRecipes(savedRecipes);
        return savedRecipes;
      } catch (error) {
        console.error("Error getting saved recipes:", error);
        console.error("Error details:", error.code, error.message);
        return [];
      }
    }

    useEffect(() => {
      getSavedRecipes(user, userId);
  }, [user, userId]);


    console.log("checking saved recipes", displaySavedRecipes)
    console.log("check if user is available here", userId)

  return (
    <div className="savedRecipesContainer">
      <Header />
      <h3>Your Saved Recipes</h3>
      
      <div className="savedRecipesList">
        {displaySavedRecipes && displaySavedRecipes.map((recipe, index) => (
          <div key={index} className="savedRecipe">
            <img 
              src={recipe?.recipeImage}
              width={350}
              height={234}
              className="cookingteamton"
              alt="Villa" 
             />
            <h2>Recipe Name: {recipe?.recipeName}</h2>
            <p>Recipe Ingredients: {recipe?.recipeIngredients?.map((ingredients) =>(
              <li key={ingredients?.id}>
                {ingredients?.name}
              </li>
            ))}</p>
            <p>Saved on: {recipe.savedAt?.toDate().toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedRecipesPage;