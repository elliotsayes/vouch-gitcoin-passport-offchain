<script>
  import { Route, router } from "tinro";
  import Layout from "./components/layout.svelte";
  import Connect from "./components/connect-wallet.svelte";
  import VerifyAo from "./components/verify-ao.svelte";
  import Success from "./components/success.svelte";
  import Ao from "./components/ao.svelte";
  import Nav from "./components/nav.svelte";

  router.mode.hash();
</script>

<Layout>
  <div slot="main">
    <Route path="/">
      <Connect />
    </Route>
    <Route path="/verify-ao">
      <VerifyAo />
    </Route>
    <Route
      path="/success"
      let:meta
    >
      <Success
        address={meta.query.address}
        message={decodeURIComponent(meta.query.message ?? "")}
      />
    </Route>
    <Route path="/aos">
      <Ao />
    </Route>
    <Route
      path="/error"
      let:meta
    >
      <h1 class="text-zinc-400 text-[30px]">
        There was an error with your request!
      </h1>
      <p class="mt-16">{decodeURI(meta.query.message)}</p>
    </Route>
  </div>
  <Nav slot="nav" />
</Layout>
