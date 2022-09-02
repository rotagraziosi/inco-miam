import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { userStore } from "../stores/user.store";
import { firebaseConfig } from "./config";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Auth = getAuth(app);
Auth.useDeviceLanguage();


onAuthStateChanged(Auth, (user) => {
    console.log(user);
    userStore.set(user);
});

export {
    Auth
}