<script lang="ts">
    import { ref, onValue, type Unsubscribe } from "firebase/database";
    import { onMount, onDestroy } from "svelte";
    import { database } from "../firebase/firebase";
    import { Button, Icon, Snackbar } from "svelte-mui";
    import DeleteIcon from "../lib/DeleteIcon.svelte";
    import { deleteMiam } from "../firebase/miam.firebase";

    const starCountRef = ref(database, "miams");

    let miams = [];
    let miamListUnsubscribe: Unsubscribe;
    let confirmMessageVisible = false;

    onMount(async (): Promise<void> => {
        miamListUnsubscribe = onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            miams = data;
        });
    });

    onDestroy((): void => {
        miamListUnsubscribe();
    });

    const onDeleteMiam = (key: string): void => {
        deleteMiam(key).then(() => {
            confirmMessageVisible = true;

            setTimeout(() => {
                confirmMessageVisible = false;
            }, 5000);
        });
    };
</script>

<h1>Gérer la liste des miams</h1>

<ul>
    {#each Object.entries(miams) as [key, miam]}
        <li>
            <span>
                {miam.label}
            </span>
            <Button icon color="primary" on:click={onDeleteMiam(key)}>
                <Icon>
                    <DeleteIcon />
                </Icon>
            </Button>
        </li>
    {/each}
</ul>

<Snackbar bind:visible={confirmMessageVisible} bg="#f44336">
    Miam supprimé
    <span slot="action">
        <Button color="#ff0" on:click={() => (confirmMessageVisible = false)}
            >Fermer</Button
        >
    </span>
</Snackbar>

<style>
    ul {
        list-style: none;
    }
</style>
