<script lang="ts">
    import type { TagSummary } from '../../api/types/tags/TagSummary';
    import getBestFontColor from '../../helpers/color/getBestFontColor';

    export let tag: TagSummary;
</script>

<span style={`--background:${tag.color};--foreground:${getBestFontColor(tag.color)};`}>{tag.text}</span>

<style lang="scss">
    @import '../../styling/1-settings/all.scss';
    span {
        background-color: var(--background);
        color: var(--foreground);
        border-radius: $rounded;
        padding: $space-xs $space-sm;
        margin-right: $space-sm;
    }
</style>
