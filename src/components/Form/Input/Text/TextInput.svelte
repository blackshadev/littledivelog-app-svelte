<script lang="ts">
    import { getFormControlContext } from '../../FormControls/formControlContext';

    export let attributes: { [name: string]: string | number | boolean | undefined } = {};
    export let value: string;
    export let placeholder = '';
    export let name: string | undefined = undefined;
    export let className = '';
    export let type: 'text' | 'password' = 'text';
    export let id: string | undefined = undefined;
    export let role: string = 'textbox';
    const { focussed } = getFormControlContext();

    let internalValue = value;
    $: internalValue = value;

    const setType = (node: HTMLInputElement) => {
        node.type = type;
    };

    function applyValue() {
        if (value === internalValue) {
            return;
        }

        value = internalValue;
    }
</script>

<input
    bind:value={internalValue}
    {id}
    {name}
    {placeholder}
    class={className}
    {role}
    {...attributes}
    on:focus={() => {
        $focussed = true;
    }}
    on:blur={() => {
        $focussed = false;
        applyValue();
    }}
    on:keydown
    use:setType
/>
