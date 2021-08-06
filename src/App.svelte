<script lang="ts">
    import Layout from './components/Layout/Layout.svelte';
</script>

<Layout />

<style lang="scss" global>
    @import './styling/all.scss';

    body {
        @apply font-sans;
        @apply absolute inset-0;
        @apply p-0 w-full h-full;
    }
</style>
