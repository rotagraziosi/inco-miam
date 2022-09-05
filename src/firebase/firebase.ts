import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { userStore } from "../stores/user.store";
import { firebaseConfig } from "./config";
import { getDatabase } from "firebase/database";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Auth = getAuth(app);
Auth.useDeviceLanguage();

const database = getDatabase(app);

onAuthStateChanged(Auth, (user) => {
    userStore.set(user);
});

export {
    Auth,
    database
}