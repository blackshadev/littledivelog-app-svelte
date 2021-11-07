<script lang="ts">
    import type { DiveSummary } from '../../../api/types/dives/DiveSummary';
    import formatDatetime from '../../../helpers/formatters/formatDatetime';
    import formatDivetime from '../../../helpers/formatters/formatDivetime';
    import formatPlace from '../../../helpers/formatters/formatPlace';
    import Tags from '../../Tags/Tags.svelte';
    import { push } from 'svelte-spa-router';
    import Route, { route } from '../../Router/routes';
    import { universalTagFromTagSummary } from '../../../helpers/transformers/toUniversalTag';

    export let dives: DiveSummary[];

    function handleClick(dive: DiveSummary): void {
        void push(route(Route.DiveDetail, { diveId: dive.dive_id.toString() }));
    }
</script>

<table class="c-table">
    <thead>
        <tr><th>Date</th><th>Divetime</th><th>Tags</th><th>Divespot</th></tr>
    </thead>
    <tbody>
        {#each dives as dive}
            <tr on:click={() => handleClick(dive)}>
                <td>{formatDatetime(dive.date)}</td>
                <td>{formatDivetime(dive.divetime)}</td>
                <td><Tags tags={dive.tags.map(universalTagFromTagSummary)} /></td>
                <td>{formatPlace(dive.place)}</td>
            </tr>
        {/each}
    </tbody>
</table>
