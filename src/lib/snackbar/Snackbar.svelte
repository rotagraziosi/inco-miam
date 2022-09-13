<script lang="ts">
    import { SnackbarType } from "../../interfaces/snackbar-informations.interface";
    import { Snackbar, Button } from "svelte-mui";
    import { onMount } from "svelte";

    export let visible = false;
    export let message: string = "";
    export let type: SnackbarType = SnackbarType.info;
    let color: string;

    $: switch (type) {
        case SnackbarType.error:
            color = "red";
            break;
        case SnackbarType.info:
            color = "blue";
            break;
        case SnackbarType.success:
            color = "green";
            break;
        case SnackbarType.warning:
            color = "yellow";
            break;
        default:
            color = "#ddd";
    }

    onMount(async () => {
        visible = false;
        message = "";
        type = SnackbarType.info;
    });
</script>

<Snackbar bind:visible bg={color}>
    {message}
    <span slot="action">
        <Button color="#ff0" on:click={() => (visible = false)}>Fermer</Button>
    </span>
</Snackbar>
