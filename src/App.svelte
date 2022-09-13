<script lang="ts">
  import Login from "./components/Login.svelte";
  import type {
    SnackbarComponentInformations,
    SnackbarInformations,
  } from "./interfaces/snackbar-informations.interface";
  import Header from "./layout/Header.svelte";
  import Snackbar from "./lib/snackbar/Snackbar.svelte";
  import { snackbarStore } from "./stores/snackbar.store";

  let snackbarInfo: SnackbarComponentInformations;

  const snackbarUnsubscribe = snackbarStore.subscribe((info) => {
    snackbarInfo = { ...info, visible: true };
  });
</script>

<main>
  <header><Header /></header>
  <article>
    <Login />
  </article>
  <footer>footer</footer>
  <Snackbar {...snackbarInfo} />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  header {
    background-color: #02070a;
    height: 50px;
  }

  article {
    flex: 1;
    overflow: auto;
  }

  footer {
    display: none;
  }
</style>
