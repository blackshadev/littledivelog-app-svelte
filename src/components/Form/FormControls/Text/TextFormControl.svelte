<script lang="ts">
    import TextInput from '../../Input/Text/TextInput.svelte';
    import FormControl from '../FormControl.svelte';

    export let value = '';
    export let placeholder = '';
    export let name: string;
    export let label: string;
    export let type: 'text' | 'password' = 'text';
</script>

<FormControl {label} let:id>
    <TextInput {id} {name} {placeholder} {type} bind:value className="c-form-control__input" />
</FormControl>
