<script>
    import Router from '../../routing/Router.svelte';
    import Navigation from './Navigation/Navigation.svelte';
</script>

<div>
    <nav>
        <Navigation />
    </nav>
    <main>
        <Router />
    </main>
</div>

<style lang="scss">
    div {
        @apply flex flex-row w-full h-full;

        nav {
            @apply w-32 h-full fixed;
            @apply bg-accent text-background;
        }

        main {
            @apply absolute flex-grow p-4 left-32 inset-0;
        }
    }
</style>
