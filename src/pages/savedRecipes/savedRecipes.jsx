// import React from 'react';
import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, deleteDoc, doc } from 'firebase/firestore';
import Header from "../../components/header/header"
import useUserName from "../../userNameHook";
import "./savedRecipes.css"
import { app } from "../../firebase";

const SavedRecipesPage = () => {
    const [displaySavedRecipes, setdisplaySavedRecipes] = useState([])
    const { user } = useUserName();
    const userId = user?.uid;
    const db = getFirestore(app);
    // const { id } = useParams() 



    
    async function getSavedRecipes(user, userId) {
      if (!userId) {
        console.error("User is not logged in.");
        return [];
      }

      try {
        const savedRecipesCollectionRef = collection(db, "user_saved_recipes");
        const q = query(savedRecipesCollectionRef);
        const querySnapshot = await getDocs(q);
        
        const savedRecipes = querySnapshot.docs
          .map(doc => doc.data())
          .filter(data => data.userId === userId);
        
        setdisplaySavedRecipes(savedRecipes);
      } catch (error) {
        console.error("Error getting saved recipes:", error);
      }
    }

    useEffect(() => {
      if (userId) {
        getSavedRecipes(user, userId);
        console.log("Saved recipe IDs:", displaySavedRecipes.map(recipe => recipe.recipeId));
      }
    }, [user, userId]);



    const deleteSavedRecipe = async (recipeId, userId) => {
      if (!user) {
        console.error("User is not logged in");
        return;
      }

      try {
        const savedRecipesCollectionRef = collection(db, "user_saved_recipes");
        const savedRecipeId = `${userId}_${recipeId}`;
        const savedRecipeDocRef = doc(savedRecipesCollectionRef, savedRecipeId);
        
        await deleteDoc(savedRecipeDocRef);
        console.log("Recipe deleted successfully");
        
        // Update local state to reflect deletion
        setdisplaySavedRecipes(prev => prev.filter(recipe => recipe.recipeId !== recipeId));
      } catch (error) {
        console.error("Error unsaving recipe:", error);
      }
    };

    return (
      <div className="savedRecipesContainer">
        <Header />
        <h2 className="savedRecipesTitle">Your Saved Recipes</h2>
        
        <div className="recipesGrid">
          {displaySavedRecipes && displaySavedRecipes.map((recipe, index) => (
            <div key={index} className="recipeCard">
              <div className="recipeImageContainer">
                <img 
                  src={recipe?.recipeImage}
                  alt={recipe?.recipeName}
                  className="recipeImage"
                />
              </div>
              
              <div className="recipeContent">
                <h3 className="recipeName">{recipe?.recipeName}</h3>
                
                <div className="recipeDetails">
                  <div className="ingredientsList">
                    <h4>Ingredients:</h4>
                    <ul>
                      {recipe?.recipeIngredients?.slice(0, 3).map((ingredient, idx) => (
                        <li key={idx}>{ingredient?.name}</li>
                      ))}
                      {recipe?.recipeIngredients?.length > 3 && <li>...</li>}
                    </ul>
                  </div>
                  
                  <div className="recipeMeta">
                    <p className="savedDate">Saved on: {recipe.savedAt?.toDate().toLocaleDateString()}</p>
                    <Link to={`/recipe-page/${recipe.recipeId}/${recipe.recipeName}`}>
                      <button className="viewRecipeBtn">View Recipe</button>
                    </Link>
                    <button className="saveRecipeButton" onClick={() => deleteSavedRecipe(recipe.recipeId, user.uid)}>
                      Unsave Recipe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default SavedRecipesPage;