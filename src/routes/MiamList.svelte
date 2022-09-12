<script lang="ts">
    import { ref, onValue, type Unsubscribe } from "firebase/database";
    import { onMount, onDestroy } from "svelte";
    import { database } from "../firebase/firebase";
    import { Button, Icon, Snackbar } from "svelte-mui";
    import DeleteIcon from "../lib/DeleteIcon.svelte";
    import { deleteMiam } from "../firebase/miam.firebase";
    import ConfirmModal from "../lib/modals/ConfirmModal.svelte";

    const starCountRef = ref(database, "miams");

    let miams = [];
    let miamListUnsubscribe: Unsubscribe;
    let confirmMessageVisible = false;
    let displayConfirmDeleteDialog = false;
    let keyToDelete = undefined;

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
        displayConfirmDeleteDialog = true;
        keyToDelete = key;
    };

    const onConfirmDelete = (
        event: CustomEvent<{ confirm: boolean }>
    ): void => {
        if (!keyToDelete) {
            throw new Error("Key of the item to delete not defined");
        }

        if (event.detail.confirm) {
            deleteMiam(keyToDelete)
                .then(() => {
                    confirmMessageVisible = true;

                    setTimeout(() => {
                        confirmMessageVisible = false;
                    }, 5000);
                })
                .finally(() => {
                    displayConfirmDeleteDialog = false;
                });
        } else {
            displayConfirmDeleteDialog = false;
        }
        keyToDelete = undefined;
    };
</script>

<h1>Gérer la liste des miams</h1>

<ul>
    {#each Object.entries(miams) as [key, miam]}
        <li>
            <div class="item-label">
                {miam.label}
            </div>
            <div class="item-actions">
                <Button icon color="primary" on:click={onDeleteMiam(key)}>
                    <Icon>
                        <DeleteIcon />
                    </Icon>
                </Button>
            </div>
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

<ConfirmModal
    visible={displayConfirmDeleteDialog}
    title={"hello world"}
    message={"message bonjour monde"}
    on:confirm={onConfirmDelete}
/>

<style>
    ul {
        list-style: none;
    }

    li {
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    li div.item-actions {
        display: none;
    }

    li:hover div.item-actions {
        display: initial;
    }
</style>
