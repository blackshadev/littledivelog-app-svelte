 <script lang="ts">
 import Router from 'svelte-spa-router'
import Home from './Home.svelte';
import NotFound from './NotFound.svelte';

const routes = {
     '/:name?': Home,
     '*': NotFound,
 };
</script>

<main>
	<Router {routes}></Router>
</main>