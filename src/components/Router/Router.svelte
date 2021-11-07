<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    import type { WrappedComponent } from 'svelte-spa-router';
    import Router from 'svelte-spa-router';
    import Dives from '../Pages/Dives/Dives.svelte';
    import Dashboard from '../Pages/Dashboard/Dashboard.svelte';
    import Login from '../Pages/Login/Login.svelte';
    import Logout from '../Pages/Logout/Logout.svelte';
    import NotFound from '../Pages/NotFound/NotFound.svelte';
    import Register from '../Pages/Register/Register.svelte';
    import Routes from './routes';

    export const routes: Record<string, typeof SvelteComponent | WrappedComponent> = {
        [Routes.Dashboard]: Dashboard,
        [Routes.Login]: Login,
        [Routes.Logout]: Logout,
        [Routes.Dives]: Dives,
        [Routes.DiveDetail]: Dives,
        [Routes.Register]: Register,
        '*': NotFound,
    };
</script>

<Router {routes} />
