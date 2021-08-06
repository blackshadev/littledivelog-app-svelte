<script lang="ts">
    import type { Tag } from '../../api/tags';
    import getBestFontColor from '../../helpers/color/getBestFontColor';

    export let tag: Tag;
    // export let color;
</script>

<span style={`--background:${tag.color};--foreground:${getBestFontColor(tag.color)};`}>{tag.text}</span>

<style lang="scss">
    span {
        @apply bg-background text-foreground;
        @apply rounded px-2 py-1 mr-2;
    }
</style>
