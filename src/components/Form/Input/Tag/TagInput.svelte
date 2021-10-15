<script lang="ts">
    import UniversalTagInput from './UniversalTagInput.svelte';
    import type { UniversalTag } from '../../../../api/types/universalTag';
    import * as api from '../../../../api/tags';
    import { withAccessToken } from '../../../../helpers/auth/withAccessToken';
    import { onMount } from 'svelte';
    import { disjunction } from '../../../../helpers/array/disjunction';
    import { universalTagFromTagSummary } from '../../../../helpers/transformers/toUniversalTag';
    import type { TagSummary } from '../../../../api/types/tags/TagSummary';

    export let id: string;
    export let placeholder: string | undefined = undefined;
    export let value: TagSummary[] = [];
    export let filterValue: string = '';
    export let inputClassName: string | undefined = undefined;
    let universalValue: UniversalTag[] = [];
    let availableTags: UniversalTag[] = [];
    let allTags: TagSummary[] = [];

    if (value) {
        universalValue = value.map(universalTagFromTagSummary);
    }

    $: if (universalValue) {
        value = universalValue.map(
            (tag) =>
                ({
                    tag_id: tag.id,
                    text: tag.text,
                    color: tag.color,
                } as TagSummary)
        );
    }

    $: availableTags = disjunction(allTags, value, (buddy) => buddy.tag_id).map((buddy) => ({
        id: buddy.tag_id,
        color: buddy.color,
        text: buddy.text,
    }));

    async function getTags(): Promise<TagSummary[]> {
        return await withAccessToken(api.listTags)();
    }

    onMount(async () => {
        allTags = await getTags();
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
