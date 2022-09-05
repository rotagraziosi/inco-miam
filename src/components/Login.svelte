<script lang="ts">
    import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    import { userStore } from "../stores/user.store";
    import { Auth } from "../firebase/firebase";
    import { Button } from "svelte-mui";
    import MiamList from "../routes/MiamList.svelte";
    import Router from "svelte-spa-router";
    import { routes } from "../routes";
    import { openLoginWithGoogleModal } from "../firebase/users.firebase";

    let user;
    const unsubscribeUser = userStore.subscribe((u) => {
        user = u;
    });
</script>

<div>
    {#if user}
        <h1>
            Bienvenue {user.displayName} !
        </h1>
        <Router {routes} />
    {:else}
        <Button
            raised
            color="primary"
            title="login"
            on:click={openLoginWithGoogleModal}
        >
            Login with Google
        </Button>
    {/if}
</div>

<style>
    h1 {
        size: 0.75em;
    }
</style>
