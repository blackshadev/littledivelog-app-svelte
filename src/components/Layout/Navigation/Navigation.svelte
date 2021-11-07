<script>
    import { link } from 'svelte-spa-router';
    import { getIsLoggedIn } from '../../../stores/auth';
    import routes from '../../Router/routes';
</script>

<ul class="c-navigation">
    {#if !$getIsLoggedIn}
        <li>
            <a href={routes.Login} use:link>
                <i class="c-icon --signin" />
                <span>Login</span>
            </a>
        </li>
    {:else}
        <li>
            <a href={routes.Dashboard} use:link>
                <i class="c-icon --dashboard" />
                <span>Dashboard</span>
            </a>
        </li>
        <li>
            <a href={routes.Dives} use:link>
                <i class="c-icon --dive" />
                <span>Dives</span>
            </a>
        </li>
        <li>
            <a href={routes.Buddies} use:link>
                <i class="c-icon --dive-buddies" />
                <span>Buddies</span>
            </a>
        </li>
        <li>
            <a href={routes.Tags} use:link>
                <i class="c-icon --dive-tags" />
                <span>Tags</span>
            </a>
        </li>
        <li>
            <a href={routes.Logout} use:link>
                <i class="c-icon --signout" />
                <span>Logout</span>
            </a>
        </li>
    {/if}
</ul>
