<script lang="ts">
    export let error: string | undefined;
</script>

{#if error}
    <p>{error}</p>
{/if}

<style lang="scss">
    p {
        color: var(--error);
    }
</style>
