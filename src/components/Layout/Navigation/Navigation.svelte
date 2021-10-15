<script>
    import { link } from 'svelte-spa-router';

    import { getIsLoggedIn } from '../../../stores/auth';
    import routes from '../../Router/routes';
</script>

<ul class="c-navigation">
    {#if !$getIsLoggedIn}
        <li>
            <a href={routes.Login} use:link>
                <span>Login</span>
            </a>
        </li>
    {:else}
        <li>
            <a href={routes.Home} use:link>
                <span>Home</span>
            </a>
        </li>
        <li><a href={routes.Dives} use:link><span>Dives</span></a></li>
        <li><a href={routes.Logout} use:link><span>Logout</span></a></li>
    {/if}
</ul>
