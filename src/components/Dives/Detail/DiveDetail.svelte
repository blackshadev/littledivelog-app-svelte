<script lang="ts">
    import type { BuddySummary } from '../../../api/types/buddies/BuddySummary';
    import type { DiveDetail } from '../../../api/types/dives/DiveDetail';
    import type { Place } from '../../../api/types/places/country';
    import formatDatetime from '../../../helpers/formatters/formatDatetime';
    import formatDivetime from '../../../helpers/formatters/formatDivetime';
    import FormControl from '../../Form/FormControls/FormControl.svelte';
    import NumberFormControl from '../../Form/FormControls/Number/NumberFormControl.svelte';
    import TextFormControl from '../../Form/FormControls/Text/TextFormControl.svelte';
    import PlaceInput from '../../Form/Input/Place/PlaceInput.svelte';
    import BuddyInput from '../../Form/Input/Tag/BuddyInput.svelte';
    import TankInput from '../../Form/Input/Tank/TankInput.svelte';

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
        country_code: string | undefined;
        place?: Place | { name: string; country_code: string };
        buddies: BuddySummary[];
    }

    const writeDive: WriteDiveDetail = {
        date: formatDatetime(dive.date),
        divetime: formatDivetime(dive.divetime),
        max_depth: dive.max_depth,
        tanks: dive.tanks.slice(0),
        country_code: dive.place?.country_code,
        place: dive.place ?? undefined,
        buddies: dive.buddies ?? [],
    };
</script>

<form>
    <TextFormControl label="Date" name="date" placeholder="2021-08-21 16:29:00" bind:value={writeDive.date} />
    <TextFormControl label="Divetime" name="divetime" placeholder="23:16" bind:value={writeDive.divetime} />
    <NumberFormControl label="Depth" name="depth" placeholder="6.2" digits={2} bind:value={writeDive.max_depth} />
    <FormControl>
        <TankInput
            labelClassName="c-form-control__label"
            inputClassName="c-form-control__input"
            bind:value={writeDive.tanks[0]}
        />
    </FormControl>
    <FormControl label="Place" let:id>
        <div class="c-form-control__line">
            <PlaceInput
                {id}
                bind:placeValue={writeDive.place}
                bind:countryValue={writeDive.country_code}
                inputClassName="c-form-control__input"
            />
        </div>
    </FormControl>
    <FormControl label="Buddies" let:id>
        <BuddyInput {id} placeholder="Buddies" inputClassName="c-form-control__input" bind:value={writeDive.buddies} />
    </FormControl>

    <pre>
        {JSON.stringify(writeDive, null , 4)}
    </pre>
</form>
