import { child, push, ref, set, update } from "firebase/database";
import { database } from "./firebase";


export const writeMiam = (label: string, description: string, needBooking: boolean): Promise<void> => {
    // A post entry.
    const miamData = {
        label,
        description,
        needBooking
    };

    // Get a key for a new miam.
    const newMiamKey = push(child(ref(database), 'miams')).key;

    // Write the new miam's data simultaneously in the miams list and the user's miam list.
    const updates = {};
    updates['/miams/' + newMiamKey] = miamData;

    return update(ref(database), updates);
}


export const deleteMiam = (key: string): Promise<void> => {
    const dbRef = ref(database);
    const updates = {};
    updates[`miams/${key}`] = null;
    return update(dbRef, updates);
};