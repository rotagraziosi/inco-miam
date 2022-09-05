import { database, Auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { userStore } from "../stores/user.store";

export const openLoginWithGoogleModal = (): void => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(Auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential =
                GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential =
                GoogleAuthProvider.credentialFromError(error);
            // ...
        });
};

export const signOutCurrentUser = (): void => {
    signOut(Auth).then(() => {
        userStore.set(undefined);
    }).catch((error) => {
        console.error(error);
    });
};
