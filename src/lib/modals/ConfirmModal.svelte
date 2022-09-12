<script lang="ts">
    import { Dialog, Button } from "svelte-mui";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let title: string;
    export let message: string;
    let modal = true;

    export let visible: boolean;

    const onConfirm = (): void => {
        dispatch("confirm", { confirm: true });
    };

    const onDiscard = (): void => {
        dispatch("confirm", { confirm: false });
    };
</script>

<Dialog bind:visible bind:modal>
    <div slot="title">{title}</div>
    <div>{message}</div>
    <div slot="actions">
        <Button on:click={onConfirm}>Valider</Button>
        <Button on:click={onDiscard}>Annuler</Button>
    </div>
</Dialog>
