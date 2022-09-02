import type { User } from "../interfaces/user.interface";
import { writable } from "svelte/store";

export const userStore = writable<User>(undefined);