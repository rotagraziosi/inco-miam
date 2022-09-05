<script lang="ts">
    import type { User } from "../interfaces/user.interface";
    import { userStore } from "../stores/user.store";
    import { Button, Icon, Sidepanel, Menu, Menuitem } from "svelte-mui";
    import { signOutCurrentUser } from "../firebase/users.firebase";

    let user: User;
    const unsubscribe = userStore.subscribe((u) => {
        user = u;
    });

    let sidepanelVisible = false;
    const toggleSidepanel = (): void => {
        sidepanelVisible = !sidepanelVisible;
    };
</script>

<div id="header">
    <div class="center-infos">
        <Button icon on:click={toggleSidepanel}>
            <Icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                    ><path
                        d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                    />
                </svg>
            </Icon>
        </Button>
    </div>
    <div class="app-title center-infos">Inco-Miam</div>
    {#if user}
        <div class="user-infos center-infos">
            <div>
                <Menu origin="top left">
                    <div slot="activator">
                        <Button
                            color="primary"
                            outlined
                            ripple={false}
                            style="padding-right: 4px;"
                        >
                            <span>
                                {user.displayName}
                            </span>
                        </Button>
                    </div>

                    <Menuitem on:click={signOutCurrentUser}
                        >Se déconnecter</Menuitem
                    >
                </Menu>
            </div>
            <img src={user.photoURL} alt={user.displayName} />
        </div>
    {:else}
        <div class="center-infos">Not logged in</div>
    {/if}
</div>

<Sidepanel left bind:visible={sidepanelVisible}>
    <div class="logo" style="padding-left: 1rem;">Help</div>
    <p>
        <i style="padding: 12px;">Blank</i>
    </p>
</Sidepanel>

<style>
    :root {
        --bg-color: #16354a;
    }
    #header {
        display: flex;
        flex-direction: row;
        height: 50px;
    }

    div.app-title {
        flex-grow: 1;
        margin-left: 25px;
    }

    div.user-infos {
        flex-basis: 300px;
        gap: 25px;
    }

    div.user-infos img {
        height: 100%;
    }

    div.center-infos {
        display: flex;
        align-items: center;
    }
</style>
