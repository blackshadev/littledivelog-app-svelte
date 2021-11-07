<script lang="ts">
    import { push } from 'svelte-spa-router';
    import Route, { route } from '../../Router/routes';
    import TagItem from '../../Tags/TagItem.svelte';
    import formatDatetime from '../../../helpers/formatters/formatDatetime';
    import type { TagSummary } from '../../../api/types/tags/TagSummary';

    export let tags: TagSummary[];

    function handleClick(tag: TagSummary): void {
        void push(route(Route.TagDetail, { tagId: tag.tag_id.toString() }));
    }
</script>

<table class="c-table">
    <thead>
        <tr><th>Name</th><th>Dive count</th><th>Last dive</th></tr>
    </thead>
    <tbody>
        {#each tags as tag}
            <tr on:click={() => handleClick(tag)}>
                <td><TagItem tag={{ id: tag.tag_id, text: tag.text, color: tag.color }} /></td>
                <td>{tag.dive_count}</td>
                <td>{formatDatetime(tag.last_dive)}</td>
            </tr>
        {/each}
    </tbody>
</table>
