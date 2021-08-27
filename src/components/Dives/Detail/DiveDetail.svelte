<script lang="ts">
    import type { DiveDetail } from '../../../api/types/dives/DiveDetail';
    import formatDatetime from '../../../helpers/formatters/formatDatetime';
    import formatDivetime from '../../../helpers/formatters/formatDivetime';
    import NumberFormControl from '../../Form/FormControls/Number/NumberFormControl.svelte';
    import TextFormControl from '../../Form/FormControls/Text/TextFormControl.svelte';

    export let dive: DiveDetail;

    interface WriteDiveDetail {
        date: string;
        divetime: string;
        max_depth: number;
        tanks: {
            volume: number;
            oxygen: number;
            pressure: {
                begin: number;
                end: number;
                type: 'psi' | 'bar';
            };
        }[];
    }

    const writeDive: WriteDiveDetail = {
        date: formatDatetime(dive.date),
        divetime: formatDivetime(dive.divetime),
        max_depth: dive.max_depth,
        tanks: [],
    };
</script>

<form>
    <TextFormControl label="Date" name="date" placeholder="2021-08-21 16:29:00" bind:value={writeDive.date} />
    <TextFormControl label="Divetime" name="divetime" placeholder="23:16" bind:value={writeDive.divetime} />
    <NumberFormControl label="Depth" name="depth" placeholder="6.2" digits={2} bind:value={writeDive.max_depth} />

    <pre>
        {JSON.stringify(writeDive, null , 4)}
    </pre>
</form>
