<script lang="ts">
    export let value = '';
    export let placeholder: string;
    export let name: string;
    export let type = 'text';

    const setType = (node: HTMLInputElement) => {
        node.type = type;
    };
</script>

<input bind:value {placeholder} {name} use:setType />

<style>
    input {
        width: 100%;
    }
</style>
