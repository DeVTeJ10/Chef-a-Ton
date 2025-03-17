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
      <img 
        src={logoImg}
        width={100}
        height={100}
        className="cookingteamton"
        alt="Villa" 
      />
      <div className="savedRecipesList">
        {displaySavedRecipes && displaySavedRecipes.map((recipe, index) => (
          <div key={index} className="savedRecipe">
            <h2>Recipe Name: {recipe.recipeName}</h2>
            <p>Recipe ID: {recipe.recipeId}</p>
            <p>Saved on: {recipe.savedAt?.toDate().toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedRecipesPage;