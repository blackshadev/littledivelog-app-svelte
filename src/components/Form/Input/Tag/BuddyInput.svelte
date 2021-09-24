<script lang="ts">
    import UniversalTagInput from './UniversalTagInput.svelte';
    import type { BuddySummary } from '../../../../api/types/buddies/BuddySummary';
    import type { UniversalTag } from '../../../../api/types/universalTag';
    import * as api from '../../../../api/buddies';
    import { withAccessToken } from '../../../../helpers/auth/withAccessToken';
    import { onMount } from 'svelte';
    import { disjunction } from '../../../../helpers/array/disjunction';
    import { universalTagFromBuddySummary } from '../../../../helpers/transformers/toUniversalTag';

    export let id: string;
    export let placeholder: string | undefined = undefined;
    export let value: BuddySummary[] = [];
    export let filterValue: string = '';
    export let inputClassName: string | undefined = undefined;
    let universalValue: UniversalTag[] = [];
    let availableTags: UniversalTag[] = [];
    let allBuddies: BuddySummary[] = [];

    if (value) {
        universalValue = value.map(universalTagFromBuddySummary);
    }

    $: if (universalValue) {
        value = universalValue.map(
            (tag) =>
                ({
                    buddy_id: tag.id,
                    text: tag.text,
                    color: tag.color,
                } as BuddySummary)
        );
    }

    $: availableTags = disjunction(allBuddies, value, (buddy) => buddy.buddy_id).map((buddy) => ({
        id: buddy.buddy_id,
        color: buddy.color,
        text: buddy.text,
    }));

    async function getBuddies(): Promise<BuddySummary[]> {
        return await withAccessToken(api.listBuddies)();
    }

    onMount(async () => {
        allBuddies = await getBuddies();
    });
</script>

<UniversalTagInput
    {id}
    {placeholder}
    {inputClassName}
    {availableTags}
    clientFilter={true}
    bind:filterValue
    bind:value={universalValue}
/>
