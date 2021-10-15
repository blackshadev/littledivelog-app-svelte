<script type="ts">
    import type { DiveDetail } from '../../../api/types/dives/DiveDetail';
    import formatDatetime from '../../../helpers/formatters/formatDatetime';
    import formatDivetime from '../../../helpers/formatters/formatDivetime';
    import Tabs from '../../Layout/DiveTabs/DiveTabs.svelte';
    import DiveDetailDebug from './DiveDetailDebug.svelte';
    import DiveDetailForm from './DiveDetailForm.svelte';
    import type { WriteDiveDetail } from './WriteDiveDetail';

    export let dive: DiveDetail;

    let writeDive: WriteDiveDetail = {
        date: formatDatetime(dive.date),
        divetime: formatDivetime(dive.divetime),
        max_depth: dive.max_depth,
        tanks: dive.tanks.slice(0),
        country_code: dive.place?.country_code,
        place: dive.place ?? undefined,
        buddies: dive.buddies ?? [],
        tags: dive.tags ?? [],
    };

    $: console.log(writeDive);
</script>

<Tabs
    bind:writeDive
    tabs={[
        {
            label: 'Summary',
            component: DiveDetailForm,
        },
        {
            label: 'Debug',
            component: DiveDetailDebug,
        },
    ]}
/>
