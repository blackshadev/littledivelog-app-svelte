<script lang="ts">
    import { listBuddies } from '../../../api/buddies';
    import { withAccessToken } from '../../../helpers/auth/withAccessToken';
    import Table from '../../Buddies/Listing/Table.svelte';

    let buddiesPromise = withAccessToken(listBuddies)();
</script>

<div class="c-page-buddies">
    {#await buddiesPromise}
        <p>Fetching buddies...</p>
    {:then buddies}
        <Table {buddies} />
    {/await}
</div>
