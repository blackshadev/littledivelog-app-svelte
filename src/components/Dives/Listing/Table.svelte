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
    @import '../../../styling/constants/all.scss';

    table {
        width: 100%;
        border-collapse: collapse;

        thead {
            th {
                text-align: left;
                padding-top: $space-lg;
                padding-bottom: $space-lg;
            }
        }

        thead th,
        tbody td {
            border: 0;
            border-bottom: 1px solid var(--light-gray);
            padding-left: $space-sm;
            padding-right: $space-sm;
        }

        tbody td {
            padding: $space-md 0;
        }

        tbody tr:hover td {
            background: var(--hover);
        }
    }
</style>
