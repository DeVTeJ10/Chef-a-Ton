import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth'
import { useState } from 'react';

const useUserName = () => {
    const [user, setUser] = useState('');

    const handleSignup = async (email, password, username) => {
        console.log("signup button called");

        const auth = getAuth();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password, username);
            const user = userCredential.user;
            
            await updateProfile(user, { displayName: username})
            console.log("user is signed up", user);

            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email,
            });
            if(userCredential){
              console.log("User signed up and data stored:", user.uid, user.displayName);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error signing up:", error);
        }

        return user;
    }

    return { user, handleSignup };
};

export default useUserName;

