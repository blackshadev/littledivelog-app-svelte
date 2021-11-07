<script lang="ts">
    import { push } from 'svelte-spa-router';
    import Route, { route } from '../../Router/routes';
    import type { BuddySummary } from '../../../api/types/buddies/BuddySummary';
    import TagItem from '../../Tags/TagItem.svelte';
    import formatDatetime from '../../../helpers/formatters/formatDatetime';

    export let buddies: BuddySummary[];

    function handleClick(buddy: BuddySummary): void {
        void push(route(Route.BuddyDetail, { buddyId: buddy.buddy_id.toString() }));
    }
</script>

<table class="c-table">
    <thead>
        <tr><th>Name</th><th>Dive count</th><th>Last dive</th></tr>
    </thead>
    <tbody>
        {#each buddies as buddy}
            <tr on:click={() => handleClick(buddy)}>
                <td><TagItem tag={{ id: buddy.buddy_id, text: buddy.text, color: buddy.color }} /></td>
                <td>{buddy.dive_count}</td>
                <td>{formatDatetime(buddy.last_dive)}</td>
            </tr>
        {/each}
    </tbody>
</table>
