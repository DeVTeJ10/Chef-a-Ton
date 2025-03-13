import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, setDoc, addDoc, doc, collection, Firestore, getDoc, query, where, getDocs } from 'firebase/firestore';
import Header from "../../components/header/header"
import logoImg from "../../images/cookaton.png";
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

      try {
        const querySnapshot = await getDocs(q);
        const savedRecipes = querySnapshot.docs.map((doc) => doc.data());
        setsavedRecipes(savedRecipes); // Use setState instead of resolve
        return savedRecipes;
      } catch (error) {
        console.error("Error getting saved recipes:", error);
        return []; // Return empty array instead of reject
      }
    }

  return (
    <div className="savedRecipesContainer">
      <Header />
      <h3>Recipe Name</h3>
      <img src={logoImg}
              width={100}
              height={100}
              className="cookingteamton"
              alt="Villa" />
      <h2>Recipe Instructions</h2>
      <h2>Recipe Ingredients</h2>
    </div>
  );
};

export default SavedRecipesPage;