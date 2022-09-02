<script lang="ts">
    import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    import { userStore } from "../stores/user.store";
    import { Auth } from "../firebase/firebase";
    import { Button } from "svelte-mui";

    const login = (): void => {
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
    let user;
    const unsubscribeUser = userStore.subscribe((u) => {
        user = u;
    });
</script>

<div>
    {#if user}
        Welcome {user.displayName} !
    {:else}
        <Button raised color="primary" title="login" on:click={login}>
            Login with Google
        </Button>
    {/if}
</div>
