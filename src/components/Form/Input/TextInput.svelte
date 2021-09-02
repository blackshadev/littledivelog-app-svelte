<script lang="ts">
    import { writable } from 'svelte/store';
    import { getFormControlContext } from '../FormControls/formControlContext';

    export let value: string;
    export let placeholder = '';
    export let name: string;
    export let className = '';
    export let type: 'text' | 'password' = 'text';
    export let id: string | undefined = undefined;
    const { focussed, invalid } = getFormControlContext() ?? { focussed: writable(false), invalid: writable(false) };

    const setType = (node: HTMLInputElement) => {
        node.type = type;
    };
</script>

<input
    bind:value
    {id}
    {name}
    {placeholder}
    class={className}
    role="textbox"
    on:focus={() => ($focussed = true)}
    on:blur={() => ($focussed = false)}
    use:setType
/>
