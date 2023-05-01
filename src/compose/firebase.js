import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import firebaseConfig from '../conf/firebaseConfig.json'
import axios from 'axios';
import apiConf from '../conf/apiConf.json';

const app  = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(authentication, provider) 
        .then((result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // console.log("🚀 ~ file: firebase.js:13 ~ .then ~ credential:", credential);

            const tokenResponse = result._tokenResponse;
            // console.log("🚀 ~ file: firebase.js:15 ~ .then ~ tokenResponse:", tokenResponse);

            const url = `${apiConf.URL || "" }/api/users/google/login`;
            // console.log("🚀 ~ file: firebase.js:21 ~ .then ~ url:", url);

            axios.post(url, tokenResponse)
                .then(res => {
                    console.log("🚀 ~ file: firebase.js:29 ~ .then ~ res:", res);
                    window.location.href = "/home/main";
                })
                .catch(err => {
                    console.log("🚀 ~ file: firebase.js:32 ~ .then ~ err:", err);
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
