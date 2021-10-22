<script lang="ts">
    import { getFormControlContext } from '../../FormControls/formControlContext';

    export let value: number;
    export let placeholder = '';
    export let digits = 0;
    export let name: string;
    export let className = '';
    export let id: string | undefined = undefined;
    const { focussed, invalid } = getFormControlContext();

    function updateVisualValue(stringValue: string | undefined) {
        let numberic = Number(stringValue);

        if (Number.isNaN(numberic)) {
            $invalid = true;
        } else {
            $invalid = false;
        }
    }

    let internalValue: string | undefined;
    $: internalValue = value.toFixed(digits);
    $: updateVisualValue(internalValue);

    function applyValue() {
        let newValue = Number(internalValue);

        if (newValue === value || $invalid) {
            return;
        }

        value = newValue;
    }
</script>

<input
    bind:value={internalValue}
    {id}
    {name}
    {placeholder}
    class={className}
    role="textbox"
    on:focus={() => ($focussed = true)}
    on:blur={() => (($focussed = false), applyValue())}
/>
