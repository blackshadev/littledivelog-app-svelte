<script lang="ts">
    import * as api from '../../../api/dives';
    import Table from '../../Dives/Listing/Table.svelte';
    import Error from '../../Form/ErrorComponent.svelte';
    import { withAccessToken } from '../../../helpers/auth/withAccessToken';
    import DiveDetail from '../../Dives/Detail/DiveDetail.svelte';
    import numberOrUndefined from '../../../helpers/transformers/numberOrUndefined';

    const getDives = withAccessToken(api.listDives);
    const getDive = withAccessToken(api.getDive);
    export let params: undefined | { diveId?: string };

    let diveId: number | undefined;
    $: diveId = numberOrUndefined(params?.diveId);
</script>

<div class="c-page-dive">
    <section class="c-page-dive__list">
        {#await getDives()}
            <p>...waiting</p>
        {:then dives}
            <Table {dives} />
        {:catch error}
            <Error {error} />
        {/await}
    </section>

    {#if diveId}
        <section class="c-page-dive__detail">
            {#await getDive(diveId)}
                <p>...waiting</p>
            {:then dive}
                <DiveDetail {dive} />
            {:catch error}
                <Error {error} />
            {/await}
        </section>
    {/if}
</div>

<style lang="scss">
    .c-page-dive {
        display: flex;

        &__list {
            flex: 1 0 50%;
        }

        &__detail {
            flex: 0 0 50%;
        }
    }
</style>
