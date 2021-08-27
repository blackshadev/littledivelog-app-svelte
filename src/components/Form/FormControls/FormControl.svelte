<script lang="ts">
    import psuedorandomString from '../../../helpers/string/randomString';
    import { setFormControlContext } from './formControlContext';

    export let label: string;
    let uniqueId = psuedorandomString();

    const { focussed, invalid } = setFormControlContext();
</script>

<p class="c-form-control" class:--focussed={$focussed} class:--invalid={$invalid}>
    <label class="c-form-control__label" for={uniqueId}>{label}</label>
    <slot id={uniqueId} />
</p>
