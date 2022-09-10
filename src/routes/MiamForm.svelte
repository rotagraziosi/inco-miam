<script lang="ts">
    import { Textfield, Checkbox, Button, Snackbar } from "svelte-mui";
    import { writeMiam } from "../firebase/miam.firebase";
    let labelField: string = "";
    let description: string = "";
    let needBooking: boolean = false;
    let snackbarVisisble: boolean = false;

    const onValidate = (): void => {
        console.log(labelField, description, needBooking);
        writeMiam(labelField, description, needBooking).then(() => {
            console.log("success write");

            labelField = "";
            description = "";
            needBooking = false;
            snackbarVisisble = true;

            setTimeout(() => {
                snackbarVisisble = false;
            }, 5000);
        });
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
</div>

<Snackbar bind:visible={snackbarVisisble} bg="#f44336">
    Miam ajouté avec succes !
    <span slot="action">
        <Button color="#ff0" on:click={() => (snackbarVisisble = false)}
            >Fermer</Button
        >
    </span>
</Snackbar>
