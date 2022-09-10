import MiamForm from "./routes/MiamForm.svelte";
import MiamList from "./routes/MiamList.svelte";
import MiamPlace from "./routes/MiamPlace.svelte";


export const routes = {
    '/': MiamList,
    "/miam": MiamPlace,
    "/miam-form": MiamForm
};