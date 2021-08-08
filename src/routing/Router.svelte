<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    import type { WrappedComponent } from 'svelte-spa-router';

    import Router from 'svelte-spa-router';
    import Dives from '../pages/Dives.svelte';
    import Home from '../pages/Home.svelte';
    import Login from '../pages/Login.svelte';
    import Logout from '../pages/Logout.svelte';
    import NotFound from '../pages/NotFound.svelte';
    import Register from '../pages/Register.svelte';
    import Routes from './routes';

    export const routes: Record<string, typeof SvelteComponent | WrappedComponent> = {
        [Routes.Home]: Home,
        [Routes.Login]: Login,
        [Routes.Logout]: Logout,
        [Routes.Dives]: Dives,
        [Routes.Register]: Register,
        '*': NotFound,
    };
</script>

<Router {routes} />
