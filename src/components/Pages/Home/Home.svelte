<script lang="ts">
    export let params: { name?: string } = {};
</script>

<main>
    <h1>Hello {params.name}!</h1>
    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
    <span class="test">test</span>
</main>

<style lang="postcss">
    main {
        text-align: center;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
        display: block;
        text-align: center;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
