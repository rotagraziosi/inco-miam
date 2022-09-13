<script lang="ts">
    import { SnackbarType } from "../interfaces/snackbar-informations.interface";
    import { Textfield, Checkbox, Button } from "svelte-mui";
    import { push } from "svelte-spa-router";
    import { writeMiam } from "../firebase/miam.firebase";
    import { snackbarStore } from "../stores/snackbar.store";

    let labelField: string = "";
    let description: string = "";
    let needBooking: boolean = false;

    const onValidate = (): void => {
        writeMiam(labelField, description, needBooking).then(() => {
            labelField = "";
            description = "";
            needBooking = false;

            snackbarStore.set({
                message: "Miam créé avec succès",
                type: SnackbarType.success,
            });
        });
    };

    const goToMiamList = (): void => {
        push("/");
    };
</script>

<div>
    <Textfield label="Label" bind:value={labelField} message="Label" />
    <Textfield
        label="Description"
        bind:value={description}
        message="Description"
    />
    <Checkbox bind:checked={needBooking}>
        <span>Besoin de reserver ?</span>
    </Checkbox>
    <Button on:click={onValidate}>Valider</Button>
    <Button on:click={goToMiamList}>Aller à la liste des Miams</Button>
</div>
