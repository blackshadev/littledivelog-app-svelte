<script lang="ts">
    import Tags from '../../../Tags/Tags.svelte';
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

    function selectValue(val: Tag) {
        value = [...value, val];
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
<Tags tags={value} />
