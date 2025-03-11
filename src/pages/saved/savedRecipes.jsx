import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, setDoc, addDoc, doc, collection, Firestore, getDoc, query, where, getDocs } from 'firebase/firestore';
import Header from "../../components/header/header"
import useUserName from "../../userNameHook";
import "./savedRecipes.css"
import { app } from "../../firebase";
import firebase from 'firebase/compat/app';

const SavedRecipesPage = () => {

    const [savedRecipes, setsavedRecipes] = useState()



    const db = getFirestore(app);
    const { user } = useUserName();

    async function getSavedRecipes() {
      const auth = firebase.auth();
      const userId = user.uid;

      if (!userId) {
        console.error("User is not logged in.");
        return [];
      }

      const savedRecipesCollectionRef = collection(db, "user_saved_recipes");
      const q = query(savedRecipesCollectionRef, where("userid", "==", userId));

      const querySnapshot = await getDocs(q);
      const savedRecipeIds = [];
      querySnapshot.forEach((doc) => {
        savedRecipeIds.push(doc.data().recipeId);
      });
      setsavedRecipes(savedRecipeIds)
      console.log("checking to display saved recipes",savedRecipes)
      return savedRecipeIds;
      
  }

  return (
    <div className="savedRecipesContainer">
      <Header />
      <h3>Recipe Name</h3>
      <img>Recipe Image</img>
      <h2>Recipe Instructions</h2>
      <h2>Recipe Ingredients</h2>
    </div>
  );
};

export default SavedRecipesPage;