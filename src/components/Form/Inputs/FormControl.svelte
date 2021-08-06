<script lang="ts">
    export let value = '';
    export let placeholder = '';
    export let name: string;
    export let label: string;
    export let type = 'text';
    let focussed = false;

    const setType = (node: HTMLInputElement) => {
        node.type = type;
    };
</script>

<p class:--focussed={focussed}>
    <label for={name}>{label}</label>
    <input
        bind:value
        {name}
        {placeholder}
        on:focus={() => (focussed = true)}
        on:blur={() => (focussed = false)}
        use:setType
    />
</p>

<style lang="scss">
    p {
        margin-top: -0.5rem;
        @apply mb-4 block;

        label {
            @apply px-1 ml-2;
            @apply relative top-2;
            @apply bg-background text-gray;
        }

        input {
            @apply border border-solid rounded;
            @apply w-full;
            @apply py-3 px-4;
            @apply box-border;
            @apply border-gray;

            background: var(--background) !important;

            &:focus {
                outline: 0;
            }
        }

        &.--focussed {
            label {
                @apply text-highlight;
            }
            input {
                @apply border-highlight;
            }
        }
    }
</style>
