<script lang="ts">
    import type { Tag } from '../../api/tags';
    import TagLabel from './TagLabel.svelte';

    export let tags: Tag[];
</script>

{#each tags as tag}
    <TagLabel {tag} />
{/each}
