<script lang="ts">
    import type { UniversalTag } from '../../api/types/universalTag';
    import TagItem from './TagItem.svelte';

    export let tags: UniversalTag[];
</script>

<ul class="c-tag">
    {#each tags as tag}
        <TagItem {tag} />
    {/each}
</ul>
