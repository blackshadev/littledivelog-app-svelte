<script lang="ts">
    export let error: string | undefined;
</script>

{#if error}
    <p>{error}</p>
{/if}

<style lang="scss">
    p {
        @apply text-red-500;
    }
</style>
