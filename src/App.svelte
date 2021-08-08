<script lang="ts">
    import Layout from './components/Layout/Layout.svelte';
</script>

<Layout />

<style lang="scss" global>
    @import './styling/all.scss';

    body {
        background: var(--background);
        font-family: Helvetica, Arial, sans-serif;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100%;
    }
</style>
