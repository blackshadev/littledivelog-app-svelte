<script lang="ts">
    import type { DiveTank } from '../../../api/types/tanks/DiveTank';

    import NumbericInput from './NumbericInput.svelte';

    export let value: DiveTank;
    export let inputClassName: string;

    let beginPressure: number = value.pressure.begin;
    let endPressure: number = value.pressure.end;
    let pressureType: 'bar' | 'psi' = value.pressure.type;
    let oxygen: number = value.oxygen;
    let volume: number = value.volume;

    $: {
        value = {
            oxygen,
            volume,
            pressure: {
                begin: beginPressure,
                end: endPressure,
                type: pressureType,
            },
        };
    }
</script>

<div class="c-input-group">
    <div class="c-input-group__row">
        <NumbericInput
            bind:value={beginPressure}
            className={inputClassName}
            name="beginPressure"
            digits={0}
            placeholder="200"
        />

        <NumbericInput
            bind:value={endPressure}
            className={inputClassName}
            name="endPressure"
            digits={0}
            placeholder="50"
        />
    </div>

    <div class="c-input-group__row">
        <NumbericInput bind:value={volume} className={inputClassName} name="volume" digits={0} placeholder="10" />

        <NumbericInput bind:value={oxygen} className={inputClassName} name="oxygen" digits={0} placeholder="21" />
    </div>
</div>
