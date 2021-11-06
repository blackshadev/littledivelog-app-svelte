<script type="ts">
    import type { DiveDetail } from '../../../api/types/dives/DiveDetail';
    import * as api from '../../../api/dives';
    import formatDatetime, { parseDatetime } from '../../../helpers/formatters/formatDatetime';
    import formatDivetime, { parseDivetime } from '../../../helpers/formatters/formatDivetime';
    import Tabs from './DiveTabs/DiveTabs.svelte';
    import DiveDetailDebug from './DiveDetailDebug.svelte';
    import DiveDetailForm from './DiveDetailForm.svelte';
    import type { WriteDiveDetail } from './WriteDiveDetail';
    import { withAccessToken } from '../../../helpers/auth/withAccessToken';
    import type { DiveUpdate } from '../../../api/types/dives/DiveUpdate';

    export let dive: DiveDetail;

    let writeDive: WriteDiveDetail = getWriteDive(dive);

    $: isChanged(writeDive) ? updateValue(writeDive) : undefined;

    function getWriteDive(dive: DiveDetail): WriteDiveDetail {
        return {
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
    }

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

    function getPlaceUpdate(
        country: WriteDiveDetail['country_code'],
        place: WriteDiveDetail['place']
    ): DiveUpdate['place'] {
        if (!place) {
            return undefined;
        }

        if (place.place_id) {
            return { place_id: place.place_id };
        }

        return { name: place.name, country_code: place.country_code ?? country };
    }

    function getDiveUpdateFromWriteDive(writeDive: WriteDiveDetail): DiveUpdate {
        return {
            buddies: writeDive.buddies,
            tags: writeDive.tags,
            date: parseDatetime(writeDive.date),
            divetime: parseDivetime(writeDive.divetime),
            max_depth: writeDive.max_depth,
            place: getPlaceUpdate(writeDive.country_code, writeDive.place),
            tanks: writeDive.tanks,
        };
    }

    async function updateValue(writeDive: WriteDiveDetail) {
        const diveUpdate = getDiveUpdateFromWriteDive(writeDive);
        if (writeDive.id) {
            const newDive = await withAccessToken(api.updateDive)(writeDive.id, diveUpdate);
            dive = newDive;
            writeDive = getWriteDive(newDive);
        }
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
