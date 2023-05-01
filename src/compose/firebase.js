import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import firebaseConfig from '../conf/firebaseConfig.json'

const app  = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(authentication, provider) 
        .then((result) => {
            // console.log(`[L]${(new Date()).toLocaleString()}]📝 firebase.js 🔊 signInWithGoogle susses result: ${result}.`);
        })
        .catch((error) => {
            console.error(`[E][${(new Date()).toLocaleString()}]📝 firebase.js 🔊 signInWithGoogle Error: ${error}.`);
        });
};
