<script lang="ts">
    import formatDatetime from '../../../helpers/formatters/formatDatetime';

    import FormControl from '../../Form/FormControls/FormControl.svelte';
    import NumberFormControl from '../../Form/FormControls/Number/NumberFormControl.svelte';
    import TextFormControl from '../../Form/FormControls/Text/TextFormControl.svelte';
    import PlaceInput from '../../Form/Input/Place/PlaceInput.svelte';
    import BuddyInput from '../../Form/Input/Tag/BuddyInput.svelte';
    import TagInput from '../../Form/Input/Tag/TagInput.svelte';
    import TankInput from '../../Form/Input/Tank/TankInput.svelte';
    import type { WriteDiveDetail } from './WriteDiveDetail';

    export let writeDive: WriteDiveDetail;
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
    <FormControl label="Tags" let:id>
        <TagInput {id} placeholder="Tags" inputClassName="c-form-control__input" bind:value={writeDive.tags} />
    </FormControl>
</form>
