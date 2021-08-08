<script lang="ts">
    import type { Tag } from '../../api/tags';
    import getBestFontColor from '../../helpers/color/getBestFontColor';

    export let tag: Tag;
    // export let color;
</script>

<span style={`--background:${tag.color};--foreground:${getBestFontColor(tag.color)};`}>{tag.text}</span>

<style lang="scss">
    @import '../../styling/constants/all.scss';
    span {
        background-color: var(--background);
        color: var(--foreground);
        border-radius: $rounded;
        padding: $space-xs $space-sm;
        margin-right: $space-sm;
    }
</style>
