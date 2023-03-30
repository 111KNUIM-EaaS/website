import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import firebaseConfig from './firebaseConfig.json' 

const app  = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(authentication, provider) 
        .then((result) => {
            console.log(result);
            console.log(result.user);
            console.log("useruid =" , result.user.uid );
            const useruid = result.user.uid
            fetch('http://172.17.0.2:80/api/password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({ uid: useruid }),
                redirect: 'follow'
            }).then(response => {
                console.log("response:", response);
                if (response.redirected) {
                    window.location.href = response.url;
                }
            }).catch(error => {
                console.log("error:", error);
            });
            window.location.href = "/home/main"
        })
        .catch((error) => {
            console.log(error);
        });
};




