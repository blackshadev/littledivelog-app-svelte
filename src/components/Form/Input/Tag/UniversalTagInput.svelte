<script lang="ts">
    import TagItem from '../../../Tags/TagItem.svelte';

    import AutocompleteInput from '../Autocomplete/AutocompleteInput.svelte';
    type Tag = {
        color: string;
        id: number;
        text: string;
    };

    export let availableTags: Tag[] = [];
    export let value: Tag[];
    export let id: string;
    export let filterValue: string;
    export let placeholder: string | undefined = undefined;
    export let inputClassName: string | undefined = undefined;
    export let clientFilter: boolean | undefined = undefined;

    let autoCompleteValue: any | undefined;

    function selectValue(val: Tag): void {
        value = [...value, val];
    }

    function unselectValue(valueToRemove: Tag): void {
        value = value.filter((tag: Tag) => valueToRemove !== tag);
    }

    let options: { label: string; value: Tag }[];
    $: options = availableTags.map((tag) => ({
        label: tag.text,
        value: { id: tag.id, text: tag.text, color: tag.color },
    }));
</script>

<AutocompleteInput
    {options}
    {id}
    {filterValue}
    {placeholder}
    {inputClassName}
    {clientFilter}
    value={autoCompleteValue}
    getKey={(t) => t.id}
    on:selectValue={(val) => {
        if (val.detail) {
            selectValue(val.detail);
        }
        filterValue = '';
        autoCompleteValue = undefined;
    }}
/>
<ul class="c-tag">
    {#each value as tag}
        <TagItem {tag}>
            <button class="o-clickable-text" on:click={() => unselectValue(tag)}> X </button>
        </TagItem>
    {/each}
</ul>
