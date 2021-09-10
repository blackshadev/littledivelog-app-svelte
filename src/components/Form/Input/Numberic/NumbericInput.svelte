<script lang="ts">
    import { writable } from 'svelte/store';
    import { getFormControlContext } from '../../FormControls/formControlContext';

    export let value: number;
    export let placeholder = '';
    export let digits = 0;
    export let name: string;
    export let className = '';
    export let id: string | undefined = undefined;
    let stringValue: string | undefined = value.toFixed(digits);
    const { focussed, invalid } = getFormControlContext();

    $: updateValue(stringValue);

    function round(number: number, precision: number): number {
        const position = Math.pow(10, precision);
        return Math.round(number * position) / position;
    }

    function updateValue(stringValue: string | undefined) {
        let numberic = Number(stringValue);

        if (Number.isNaN(numberic)) {
            $invalid = true;
        } else {
            $invalid = false;
            value = round(numberic, digits);
        }
    }

    function roundStringValue() {
        if ($invalid) {
            return;
        }

        stringValue = value?.toFixed(digits);
    }
</script>

<input
    bind:value={stringValue}
    {id}
    {name}
    {placeholder}
    class={className}
    role="textbox"
    on:focus={() => ($focussed = true)}
    on:blur={() => (($focussed = false), roundStringValue())}
/>
