<script lang="ts">
    import { link } from 'svelte-spa-router';
    import type { Profile } from '../../api/types/profile/profile';
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
            <i class="c-icon --dive" />
            {profile.dive_count}
        </a>
        <a class="c-dashboard__metrics__item" href="/" use:link aria-label="Computer count">
            <i class="c-icon --dive-computer" />
            {profile.computer_count}
        </a>
        <a class="c-dashboard__metrics__item" href="/" use:link aria-label="Buddy count">
            <i class="c-icon --dive-buddy" />
            {profile.buddy_count}
        </a>
        <a class="c-dashboard__metrics__item" href="/" use:link aria-label="Tag count">
            <i class="c-icon --dive-tag" />
            {profile.tag_count}
        </a>
    </div>
</div>
