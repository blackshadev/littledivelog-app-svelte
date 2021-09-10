<script lang="ts">
    import TankInput from './TankInput.svelte';
    import type { DiveTank } from '../../../../api/types/tanks/DiveTank';

    let value: DiveTank = {
        volume: 12,
        oxygen: 21,
        pressure: {
            begin: 200,
            end: 50,
            type: 'bar',
        },
    };
</script>

<TankInput bind:value />
<pre data-testid="value">
    { JSON.stringify(value, null, 4) }
</pre>
