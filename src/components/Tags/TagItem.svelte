<script lang="ts">
    import type { UniversalTag } from '../../api/types/universalTag';
    import getBestFontColor from '../../helpers/color/getBestFontColor';

    export let tag: UniversalTag;
</script>

<li class="c-tags__item" style={`--background:${tag.color};--foreground:${getBestFontColor(tag.color)};`}>
    <span>{tag.text}</span>
    <slot />
</li>
