<script lang="ts">
    import { getProfile } from '../../../api/profile';
    import { withAccessToken } from '../../../helpers/auth/withAccessToken';
    import Dashboard from '../../Dashboard/Dashboard.svelte';

    let profilePromise = withAccessToken(getProfile)();
</script>

{#await profilePromise}
    <p>Fetching data...</p>
{:then profile}
    <Dashboard {profile} />
{/await}
