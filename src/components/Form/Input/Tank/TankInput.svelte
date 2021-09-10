<script lang="ts">
    import type { DiveTank } from '../../../../api/types/tanks/DiveTank';
    import psuedorandomString from '../../../../helpers/string/randomString';
    import NumbericInput from './../Numberic/NumbericInput.svelte';
    import SelectInput from '../Select/SelectInput.svelte';

    export let value: DiveTank;
    export let inputClassName: string | undefined = undefined;
    export let labelClassName: string | undefined = undefined;

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

    const idBeginPressure = psuedorandomString(),
        idEndPressure = psuedorandomString(),
        idVolume = psuedorandomString(),
        idOxygen = psuedorandomString(),
        idType = psuedorandomString();
</script>

<div class="c-input-group">
    <div class="c-input-group__row">
        <div class="c-input-group__row__labels">
            <label class={labelClassName} for={idBeginPressure}>Begin Pressure</label>
            <label class={labelClassName} for={idEndPressure}>End Pressure</label>
            <label class={labelClassName} for={idType}>Type</label>
        </div>

        <div class="c-input-group__row__inputs">
            <NumbericInput
                id={idBeginPressure}
                bind:value={beginPressure}
                className={inputClassName}
                name="beginPressure"
                digits={0}
                placeholder="200"
            />

            <NumbericInput
                id={idEndPressure}
                bind:value={endPressure}
                className={inputClassName}
                name="endPressure"
                digits={0}
                placeholder="50"
            />

            <SelectInput
                id={idType}
                bind:value={value.pressure.type}
                className="{inputClassName} --small"
                name="type"
                values={[
                    { label: 'bar', value: 'bar' },
                    { label: 'psi', value: 'psi' },
                ]}
            />
        </div>
    </div>

    <div class="c-input-group__row">
        <div class="c-input-group__row__inputs">
            <NumbericInput
                bind:value={volume}
                id={idVolume}
                className={inputClassName}
                name="volume"
                digits={0}
                placeholder="10"
            />
            <NumbericInput
                bind:value={oxygen}
                id={idOxygen}
                className={inputClassName}
                name="oxygen"
                digits={0}
                placeholder="21"
            />
        </div>

        <div class="c-input-group__row__labels">
            <label class={labelClassName} for={idVolume}>Volume</label>
            <label class={labelClassName} for={idOxygen}>Oxygen</label>
        </div>
    </div>
</div>
