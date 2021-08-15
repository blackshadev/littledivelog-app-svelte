<script type="ts">
    import ErrorComponent from '../../Form/ErrorComponent.svelte';
    import FormControl from '../../Form/Inputs/FormControl.svelte';
    import * as auth from '../../../api/auth';
    import { getIsLoggedIn, setTokens } from '../../../stores/auth';
    import { replace } from 'svelte-spa-router';
    import routes from '../../Router/routes';

    let email: string;
    let password: string;
    let passwordConfirm: string;
    let name: string;
    let error: string;

    if ($getIsLoggedIn) {
        void replace(routes.Dives);
    }

    async function register() {
        if (password !== passwordConfirm) {
            error = 'Passwords do not match';
            return;
        }

        try {
            await auth.register({
                email,
                password,
                name,
            });

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

<section class="o-container">
    <header>
        <h1>Start logging, Register!</h1>
    </header>

    <form on:submit|preventDefault={register}>
        <FormControl label="E-Mail" name="email" placeholder="john@doe.com" bind:value={email} />
        <FormControl label="Password" name="password" type="password" bind:value={password} />
        <FormControl label="Confirm Password" name="password-conform" type="password" bind:value={passwordConfirm} />
        <FormControl label="Display name" name="name" placeholder="John Doe" bind:value={name} />
        <ErrorComponent {error} />
        <button type="submit">Register</button>
    </form>
</section>
