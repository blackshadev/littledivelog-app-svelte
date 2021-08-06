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
    @import '../../../styling/colors.scss';

    p {
        margin-top: -0.5rem;
        @apply mb-4 block;

        label {
            background: $background;
            color: $grey;
            @apply px-1 ml-2;
            @apply relative top-2;
        }

        input {
            border-color: $grey;
            @apply border border-solid rounded;
            @apply w-full;
            @apply py-3 px-4;
            @apply box-border;

            &:focus {
                outline: 0;
            }
        }

        &.--focussed {
            label {
                color: $highlight;
            }
            input {
                border-color: $highlight;
            }
        }
    }
</style>
