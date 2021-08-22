<script lang="ts">
    export let value: number;
    export let placeholder = '';
    export let digits = 0;
    export let name: string;
    export let label: string;
    let focussed = false;
    let stringValue: string = value.toFixed(digits);
    let invalid = false;

    $: updateValue(stringValue);

    function round(number: number, precision: number): number {
        const position = Math.pow(10, precision);
        return Math.round(number * position) / position;
    }

    function updateValue(stringValue: string) {
        let numberic = Number(stringValue);

        if (Number.isNaN(numberic)) {
            invalid = true;
        } else {
            invalid = false;
            value = round(numberic, digits);
        }
    }

    function roundStringValue() {
        if (invalid) {
            return;
        }

        stringValue = value.toFixed(digits);
    }
</script>

<p class="c-form-control" class:--focussed={focussed} class:--invalid={invalid}>
    <label class="c-form-control__label" for={name}>{label}</label>
    <input
        class="c-form-control__input"
        bind:value={stringValue}
        {name}
        {placeholder}
        aria-label={name}
        role="textbox"
        on:focus={() => (focussed = true)}
        on:blur={() => ((focussed = false), roundStringValue())}
    />
</p>
