<script lang="ts">
    import type { DiveSummary } from '../../../api/dives';
    import formatDatetime from '../../../helpers/formatters/formatDatetime';
    import formatDivetime from '../../../helpers/formatters/formatDivetime';
    import formatPlace from '../../../helpers/formatters/formatPlace';
    import Tags from '../../Tags/Tags.svelte';
    export let dives: DiveSummary[];
</script>

<table>
    <thead>
        <tr><th>Date</th><th>Divetime</th><th>Tags</th><th>Divespot</th></tr>
    </thead>
    <tbody>
        {#each dives as dive}
            <tr>
                <td>{formatDatetime(dive.date)}</td>
                <td>{formatDivetime(dive.divetime)}</td>
                <td><Tags tags={dive.tags} /></td>
                <td>{formatPlace(dive.place)}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style lang="scss">
    table {
        @apply w-full border-collapse;

        thead {
            th {
                @apply text-left;
                @apply py-5;
            }
        }

        thead th,
        tbody td {
            @apply border-0 border-b border-light-gray border-solid px-2;
        }

        tbody td {
            @apply py-4;
        }

        tbody tr:hover td {
            @apply bg-hover;
        }
    }
</style>
