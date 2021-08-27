<script lang="ts">
    import { link, replace } from 'svelte-spa-router';
    import FormControl from '../../Form/FormControls/Text/TextFormControl.svelte';
    import ErrorComponent from '../../Form/ErrorComponent.svelte';
    import routes from '../../Router/routes';
    import * as auth from '../../../api/auth';
    import { getIsLoggedIn, setTokens } from '../../../stores/auth';

    let email: string;
    let password: string;
    let error: string | undefined;

    if ($getIsLoggedIn) {
        void replace(routes.Dives);
    }

    async function login() {
        try {
            const resp = await auth.login({ email, password });
            setTokens({ refreshToken: resp.refresh_token, accessToken: resp.access_token });
            void replace(routes.Dives);
        } catch (err: unknown) {
            if (err instanceof Error) {
                error = err.message;
            }
        }
    }
</script>

<form class="o-container" on:submit|preventDefault={login}>
    <p class="message">Welcome!</p>
    <FormControl label="E-Mail" name="email" placeholder="john@doe.com" bind:value={email} />
    <FormControl label="Password" name="password" type="password" bind:value={password} />
    <ErrorComponent {error} />
    <p class="action-bar">
        <button type="submit">Login</button>
        <a href={routes.Register} use:link>Register</a>
    </p>
</form>

<style lang="scss">
    @import '../../../styling/1-settings/all.scss';

    .message {
        margin-bottom: $space-md;
    }
</style>
