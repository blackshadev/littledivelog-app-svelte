<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    import type { WriteDiveDetail } from '../WriteDiveDetail';

    type Tab = {
        label: string;
        component: typeof SvelteComponent;
    };
    export let tabs: Tab[] = [];
    export let activeTab: string | undefined = tabs?.[0]?.label;
    export let writeDive: WriteDiveDetail;

    let currentTab: Tab | undefined = undefined;
    $: currentTab = tabs.find((t) => t.label === activeTab);
</script>

<div class="c-tabs">
    <ul class="c-tabs__header">
        {#each tabs as tab}
            <li
                class="c-tabs__header__item {activeTab === tab.label ? '--active' : ''}"
                on:click={() => (activeTab = tab.label)}
            >
                {tab.label}
            </li>
        {/each}
    </ul>
    <div class="c-tabs__content">
        {#if currentTab}
            <svelte:component this={currentTab.component} bind:writeDive />
        {/if}
    </div>
</div>
