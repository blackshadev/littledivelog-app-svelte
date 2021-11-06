<script lang="ts">
    import Fa from 'svelte-fa';
    import { link } from 'svelte-spa-router';
    import type { Profile } from '../../api/types/profile/profile';
    import { faTint, faDesktop, faUsers, faTags } from '@fortawesome/free-solid-svg-icons';
    import routes from '../Router/routes';
    import { getGreeting } from '../../helpers/string/greeting';

    export let profile: Profile;
    let greeting: string = getGreeting();
</script>

<div class="c-dashboard">
    <h1 data-testId="greeting">Welcome {profile.name}</h1>
    <h2 data-testId="greeting-text">{greeting}</h2>

    <hr />

    <div class="c-dashboard__metrics">
        <a class="c-dashboard__metrics__item" href={routes.Dives} use:link aria-label="Dive count">
            <Fa icon={faTint} />
            {profile.dive_count}
        </a>
        <a class="c-dashboard__metrics__item" href="/" use:link aria-label="Computer count">
            <Fa icon={faDesktop} />
            {profile.computer_count}
        </a>
        <a class="c-dashboard__metrics__item" href="/" use:link aria-label="Buddy count">
            <Fa icon={faUsers} />
            {profile.buddy_count}
        </a>
        <a class="c-dashboard__metrics__item" href="/" use:link aria-label="Tag count">
            <Fa icon={faTags} />
            {profile.tag_count}
        </a>
    </div>
</div>
