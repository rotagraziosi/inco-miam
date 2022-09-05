<script lang="ts">
    import { getDatabase, ref, onValue } from "firebase/database";
    import { database } from "../firebase/firebase";

    const starCountRef = ref(database, "miams");

    let miams = [];
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        miams = data;
    });
</script>

<ul>
    {#each Object.values(miams) as miam}
        <li>{miam.label}</li>
    {/each}
</ul>

<style>
    ul {
        list-style: none;
    }
</style>
