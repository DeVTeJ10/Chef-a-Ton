import React from 'react';
import { useState, useEffect } from 'react';
import { getFirestore, setDoc, addDoc, doc, collection, Firestore, getDoc } from 'firebase/firestore';
import Header from "../../components/header/header"
import "./savedRecipes.css"

const savedRecipesPage = () => {
  return (
    <div className="savedRecipesContainer">
      <Header />
    </div>
  )
}

export default savedRecipesPage