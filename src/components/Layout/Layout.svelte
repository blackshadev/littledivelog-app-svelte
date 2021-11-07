<script lang="ts">
    import Router from '../Router/Router.svelte';
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
    @import '../../styling/1-settings/all.scss';
    div {
        $nav-size: 9rem;

        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;

        nav {
            position: fixed;
            width: $nav-size;
            height: 100%;
            background-color: var(--accent);
            color: var(--background);
        }

        main {
            position: absolute;
            flex-grow: 1;
            left: $nav-size;
            min-height: 100%;
            top: 0;
            right: 0;
        }
    }
</style>
