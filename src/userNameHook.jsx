import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const useUserName = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser({});
            }
        });

        return () => unsubscribe();
    }, []);

    

    const handleSignups = async (email, password, username) => {
        console.log("signup button called");

        const auth = getAuth();

        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password, username);
            
            const user = userCredential.user;
            
            await updateProfile(user, { displayName: username });
            setUser(user);
            console.log("user is signed up", user);

            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email,
            });

            await updateProfile(user, { displayName: username})
            console.log("user is signed up", user);
            console.log("checking if user display name is showing?", user.displayName)

            if (userCredential) {
                console.log("User signed up and data stored:", user.uid, user.displayName);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error signing up:", error);
        }

        return user;
    } 

    return { user, handleSignups };
};

export default useUserName;

