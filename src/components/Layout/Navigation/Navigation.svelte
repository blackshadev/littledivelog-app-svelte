<script>
    import { link } from 'svelte-spa-router';

    import { getIsLoggedIn } from '../../../stores/auth';
    import routes from '../../Router/routes';
</script>

<ul>
    {#if !$getIsLoggedIn}
        <li><a href={routes.Login} use:link>Login</a></li>
    {:else}
        <li><a href={routes.Home} use:link>Home</a></li>
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
