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
    {role}
    {...attributes}
    on:focus={() => ($focussed = true)}
    on:blur={() => ($focussed = false)}
    on:keydown
    use:setType
/>
