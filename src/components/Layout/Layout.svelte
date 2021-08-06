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
    @import '../../styling/colors.scss';

    div {
        @apply flex flex-row w-full h-full;

        nav {
            background-color: $accent;
            color: $background;
            @apply w-32 h-full;
        }

        main {
            @apply flex-grow p-4;
        }
    }
</style>
