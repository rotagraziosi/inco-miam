<script lang="ts">
  import Login from "./components/Login.svelte";
  import Header from "./layout/Header.svelte";
</script>

<main>
  <header><Header /></header>
  <article>
    <Login />
  </article>
  <footer>footer</footer>
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
    /* background-color: purple; */
    flex: 1;
    overflow: auto;
  }

  footer {
    /* background-color: blue; */
  }
</style>
