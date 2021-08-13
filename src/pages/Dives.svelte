<script lang="ts">
    import { listDives } from '../api/dives';
    import Table from '../components/Dives/Listing/Table.svelte';
    import Error from '../components/Form/ErrorComponent.svelte';
    import { withAccessToken } from '../helpers/auth/withAccessToken';

    const result = withAccessToken(listDives);
</script>

<section>
    {#await result}
        <p>...waiting</p>
    {:then dives}
        <Table {dives} />
    {:catch error}
        <Error {error} />
    {/await}
</section>
