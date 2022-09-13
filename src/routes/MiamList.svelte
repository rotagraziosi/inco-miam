<script lang="ts">
    import { ref, onValue, type Unsubscribe } from "firebase/database";
    import { onMount, onDestroy } from "svelte";
    import { database } from "../firebase/firebase";
    import { Button, Icon, Snackbar } from "svelte-mui";
    import DeleteIcon from "../lib/DeleteIcon.svelte";
    import { deleteMiam } from "../firebase/miam.firebase";
    import ConfirmModal from "../lib/modals/ConfirmModal.svelte";
    import { push } from "svelte-spa-router";
    import { snackbarStore } from "../stores/snackbar.store";
    import { SnackbarType } from "../interfaces/snackbar-informations.interface";

    const starCountRef = ref(database, "miams");

    let miams = [];
    let miamListUnsubscribe: Unsubscribe;

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
        const confirmModal = new ConfirmModal({
            target: document.body,
            props: {
                message: `Voulez vous supprimer ce miam ?`,
                title: "Supprimer un miam",
                visible: true,
            },
        });
        confirmModal.$on("confirm", (e: CustomEvent<{ confirm: boolean }>) => {
            if (confirm) {
                deleteMiam(key).then(() => {
                    snackbarStore.set({
                        message: "Miam supprimé avec succès",
                        type: SnackbarType.success,
                    });
                });
            }
        });
    };

    const goToMiamForm = (): void => {
        push("/miam-form");
    };
</script>

<h1>Gérer la liste des miams</h1>

<Button on:click={goToMiamForm}>Ajouter un miam</Button>

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
