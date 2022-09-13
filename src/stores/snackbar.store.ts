import { SnackbarType, type SnackbarInformations } from "../interfaces/snackbar-informations.interface";
import { writable } from "svelte/store";

export const snackbarStore = writable<SnackbarInformations>({ message: '', type: SnackbarType.info });
