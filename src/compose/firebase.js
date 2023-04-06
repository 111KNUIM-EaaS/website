import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import firebaseConfig from './firebaseConfig.json' 


const app  = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(authentication, provider) 
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log("🚀 ~ file: firebase.js:13 ~ .then ~ credential:", credential);
        const tokenResponse = result._tokenResponse;
        console.log("🚀 ~ file: firebase.js:15 ~ .then ~ tokenResponse:", tokenResponse)

        fetch('http://localhost:8000/api/users/google/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tokenResponse)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            console.log("🚀 ~ file: firebase.js:32 ~ .then ~ data:", data);
        })
        .catch(error => {
            console.log("🚀 ~ file: firebase.js:35 ~ .then ~ error:", error);
        });
    })
    .catch((error) => {
        console.log("🚀 ~ file: firebase.js:39 ~ signInWithGoogle ~ error:", error);
    });
};




