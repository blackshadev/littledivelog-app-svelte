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
    @import '../../../styling/constants/all.scss';

    p {
        margin-top: -0.5rem;
        margin-bottom: $space-md;
        display: block;

        label {
            position: relative;
            top: $space-sm;
            padding: 0 $space-xs;
            margin-left: $space-sm;
            background: var(--background);
            color: var(--gray);
        }

        input {
            border: 1px solid var(--gray);
            border-radius: $rounded;
            width: 100%;

            /* padding: $space-md $space */
            padding: $space-md - $space-xs $space-md;
            background: var(--background) !important;

            &:focus {
                outline: 0;
            }
        }

        &.--focussed {
            label {
                color: var(--highlight);
            }
            input {
                border-color: var(--highlight);
            }
        }
    }
</style>
