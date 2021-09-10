<script lang="ts">
    import { writable } from 'svelte/store';

    import { getFormControlContext } from '../../FormControls/formControlContext';

    export let values: { value: string; label: string }[];
    export let className: string | undefined = undefined;
    export let id: string | undefined = undefined;
    export let name: string | undefined = undefined;
    export let value: string;
    const { focussed } = getFormControlContext() ?? { focussed: writable(false) };
</script>

<select
    class={className}
    {id}
    {name}
    bind:value
    role="combobox"
    on:focus={() => ($focussed = true)}
    on:blur={() => ($focussed = false)}
>
    {#each values as value}
        <option value={value.value}>{value.label}</option>
    {/each}
</select>
