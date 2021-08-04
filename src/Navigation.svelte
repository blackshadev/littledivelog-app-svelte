<script>
    import { link } from 'svelte-spa-router';
</script>

<nav>
    <ul>
        <li><a href="/login" use:link>Login</a></li>
        <li><a href="/home" use:link>Home</a></li>
        <li><a href="/about" use:link>About</a></li>
    </ul>
</nav>

<style lang="scss">
    nav {
        ul {
            list-style: none;
        }
    }
</style>
