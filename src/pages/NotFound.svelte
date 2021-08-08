<script lang="ts">
    import { location } from 'svelte-spa-router';
</script>

<p>
    Page {$location} not found
</p>

<style lang="scss">
    @import '../styling/constants/all.scss';

    p {
        font-size: $text-lg;
        line-height: $line-lg;
    }
</style>
