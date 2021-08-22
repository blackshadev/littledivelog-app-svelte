<script lang="ts">
    export let value = '';
    export let placeholder = '';
    export let name: string;
    export let label: string;
    export let type: 'text' | 'password' = 'text';
    let focussed = false;

    const setType = (node: HTMLInputElement) => {
        node.type = type;
    };
</script>

<p class="c-form-control" class:--focussed={focussed}>
    <label class="c-form-control__label" for={name}>{label}</label>
    <input
        class="c-form-control__input"
        bind:value
        {name}
        {placeholder}
        aria-label={name}
        role="textbox"
        on:focus={() => (focussed = true)}
        on:blur={() => (focussed = false)}
        use:setType
    />
</p>
