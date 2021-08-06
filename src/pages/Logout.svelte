<script lang="ts">
    import { replace } from 'svelte-spa-router';

    import * as auth from '../api/auth';
    import ErrorComponent from '../components/Form/Error.svelte';
    import Routes from '../routing/routes';
    import { getRefreshToken, reset } from '../stores/auth';
    import getStoreValue from '../stores/getStoreValue';

    const refreshToken = getStoreValue(getRefreshToken);

    async function redirectToLogin(): Promise<void> {
        await replace(Routes.Login);
    }

    let error: string;

    async function logout(): Promise<void> {
        if (!refreshToken) {
            return;
        }

        try {
            await auth.logout(refreshToken);
        } catch {
            /* Ignore errors */
        }

        reset();
    }

    function handleError(err: unknown) {
        if (err instanceof Error) {
            error = err.message;
        }
    }
    logout().then(redirectToLogin).catch(handleError);
</script>

<p>Logging out...</p>
<ErrorComponent {error} />
