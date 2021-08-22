<script lang="ts">
    import type { TagSummary } from '../../api/types/tags/TagSummary';
    import TagLabel from './TagLabel.svelte';

    export let tags: TagSummary[];
</script>

{#each tags as tag}
    <TagLabel {tag} />
{/each}
