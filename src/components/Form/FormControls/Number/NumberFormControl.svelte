<script lang="ts">
    import NumbericInput from '../../Input/NumbericInput.svelte';
    import FormControl from '../FormControl.svelte';

    export let value: number;
    export let placeholder = '';
    export let digits = 0;
    export let name: string;
    export let label: string;
</script>

<FormControl {label} let:id>
    <NumbericInput {id} {placeholder} {digits} {name} bind:value className="c-form-control__input" />
</FormControl>
