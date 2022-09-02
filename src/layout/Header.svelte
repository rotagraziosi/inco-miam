<script lang="ts">
    import type { User } from "../interfaces/user.interface";
    import { userStore } from "../stores/user.store";

    let user: User;
    const unsubscribe = userStore.subscribe((u) => {
        user = u;
    });
</script>

<div id="header">
    <div class="app-title">Inco-Miam</div>
    {#if user}
        <div class="user-infos">
            {user.displayName}
            <img src={user.photoURL} alt={user.displayName} />
        </div>
    {:else}
        <div>Not logged in</div>
    {/if}
</div>

<style>
    #header {
        display: flex;
        flex-direction: row;
    }

    div.app-title {
        flex-grow: 1;
    }

    div.user-infos {
        flex-basis: 300px;
    }

    div.user-infos img {
        height: 40px;
    }
</style>
