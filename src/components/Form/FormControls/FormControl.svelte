<script lang="ts">
    import psuedorandomString from '../../../helpers/string/randomString';
    import { setFormControlContext } from './formControlContext';

    export let label: string | undefined = undefined;
    let uniqueId = psuedorandomString();

    const { focussed, invalid } = setFormControlContext();
</script>

<p class="c-form-control" class:--focussed={$focussed} class:--invalid={$invalid}>
    {#if label}
        <label class="c-form-control__label" for={uniqueId}>{label}</label>
    {/if}
    <slot id={uniqueId} />
</p>
