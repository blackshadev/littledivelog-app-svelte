<script lang="ts">
    import FormControl from '../components/Form/Inputs/FormControl.svelte';
    import routes from '../routing/routes';
    import * as auth from '../api/auth';
    import ErrorComponent from '../components/Form/Error.svelte';
    import { setTokens } from '../stores/auth';

    let email: string;
    let password: string;
    let error: string | undefined;

    async function login() {
        try {
            const resp = await auth.login(email, password);
            setTokens({ refreshToken: resp.refresh_token, accessToken: resp.access_token });
        } catch (err: unknown) {
            if (err instanceof Error) {
                error = err.message;
            }
        }
    }
</script>

<form class="container" on:submit|preventDefault={login}>
    <p class="message">Welcome!</p>
    <FormControl label="E-Mail" name="email" placeholder="john@doe.com" bind:value={email} />
    <FormControl label="Password" name="password" type="password" bind:value={password} />
    <ErrorComponent {error} />
    <p class="action-bar">
        <button type="submit">Login</button>
        <a href={routes.Register}>Register</a>
    </p>
</form>

<style lang="scss">
    @import '../styling/colors.scss';

    form {
        border-color: $light-grey;
        @apply mx-auto max-w-lg rounded border border-solid p-10;
    }

    .message {
        @apply mb-4;
    }
</style>
