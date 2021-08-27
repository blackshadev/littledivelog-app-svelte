<script lang="ts">
    import psuedorandomString from '../../../../helpers/string/randomString';

    export let value = '';
    export let placeholder = '';
    export let name: string;
    export let label: string;
    export let type: 'text' | 'password' = 'text';
    let uniqueId = `${psuedorandomString()}_${name}`;
    let focussed = false;

    const setType = (node: HTMLInputElement) => {
        node.type = type;
    };
</script>

<p class="c-form-control" class:--focussed={focussed}>
    <label class="c-form-control__label" for={uniqueId}>{label}</label>
    <input
        class="c-form-control__input"
        bind:value
        id={uniqueId}
        {name}
        {placeholder}
        aria-label={name}
        role="textbox"
        on:focus={() => (focussed = true)}
        on:blur={() => (focussed = false)}
        use:setType
    />
</p>
