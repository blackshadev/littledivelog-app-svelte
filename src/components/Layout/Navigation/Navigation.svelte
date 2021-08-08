<script>
    import { onDestroy } from 'svelte';

    import { link } from 'svelte-spa-router';
    import routes from '../../../routing/routes';
    import { getIsLoggedIn } from '../../../stores/auth';

    let isLoggedIn = false;
    const unsubscribe = getIsLoggedIn.subscribe((v) => (isLoggedIn = v));

    onDestroy(unsubscribe);
</script>

<ul>
    <li><a href={routes.Home} use:link>Home</a></li>
    <li><a href={routes.About} use:link>About</a></li>

    {#if !isLoggedIn}
        <li><a href={routes.Login} use:link>Login</a></li>
    {/if}
    {#if isLoggedIn}
        <li><a href={routes.Dives} use:link>Dives</a></li>
        <li><a href={routes.Logout} use:link>Logout</a></li>
    {/if}
</ul>

<style lang="scss">
    @import '../../../styling/constants/all.scss';
    ul {
        list-style: none;
    }

    a {
        color: var(--background);
        display: block;
        padding: $space-sm $space-md;
        text-decoration: none;
        width: 100%;

        &:hover {
            text-decoration: underline;
        }
    }
</style>
