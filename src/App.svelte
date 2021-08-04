<script lang="ts">
    import Router from 'svelte-spa-router';
    import Home from './Home.svelte';
    import Navigation from './Navigation.svelte';
    import NotFound from './NotFound.svelte';

    const routes = {
        '/:name?': Home,
        '*': NotFound,
    };
</script>

<Navigation />
<main>
    <Router {routes} />
</main>

<style global>
    @import 'normalize.css';
</style>
