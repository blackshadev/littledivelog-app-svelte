<script lang="ts">
    import { listTags } from '../../../api/tags';
    import { withAccessToken } from '../../../helpers/auth/withAccessToken';
    import Table from '../../Tags/Listing/Table.svelte';

    let tagsPromise = withAccessToken(listTags)();
</script>

<div class="c-page-buddies">
    {#await tagsPromise}
        <p>Fetching tags...</p>
    {:then tags}
        <Table {tags} />
    {/await}
</div>
