<script type="ts">
    import type { DiveDetail } from '../../../api/types/dives/DiveDetail';
    import formatDatetime from '../../../helpers/formatters/formatDatetime';
    import formatDivetime from '../../../helpers/formatters/formatDivetime';
    import Tabs from './DiveTabs/DiveTabs.svelte';
    import DiveDetailDebug from './DiveDetailDebug.svelte';
    import DiveDetailForm from './DiveDetailForm.svelte';
    import type { WriteDiveDetail } from './WriteDiveDetail';

    export let dive: DiveDetail;

    let writeDive: WriteDiveDetail = {
        id: dive.dive_id,
        updated: formatDatetime(dive.updated),
        date: formatDatetime(dive.date),
        divetime: formatDivetime(dive.divetime),
        max_depth: dive.max_depth,
        tanks: dive.tanks.slice(0),
        country_code: dive.place?.country_code,
        place: dive.place ?? undefined,
        buddies: dive.buddies ?? [],
        tags: dive.tags ?? [],
    };

    $: isChanged(writeDive) ? updateValue(writeDive) : undefined;

    function isEqual(a: WriteDiveDetail | undefined, b: WriteDiveDetail | undefined): boolean {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    function deepCopy(a: WriteDiveDetail): WriteDiveDetail {
        return JSON.parse(JSON.stringify(a));
    }

    let prevValue: WriteDiveDetail | undefined;
    function isChanged(newValue: WriteDiveDetail | undefined) {
        if (prevValue?.id !== newValue?.id) {
            prevValue = undefined;
        }

        const isChanged = prevValue !== undefined && newValue !== undefined && !isEqual(prevValue, newValue);
        prevValue = newValue ? deepCopy(newValue) : undefined;
        return isChanged;
    }

    function updateValue(writeDive: WriteDiveDetail) {
        console.log('update', writeDive);
    }
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
