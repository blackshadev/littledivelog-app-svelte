<script type="ts">
    import FormControl from '../components/Form/Inputs/FormControl.svelte';

    let email: string;
    let password: string;
    let passwordConfirm: string;
    let displayName: string;

    async function register() {
        /** TODO: this */
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
        <FormControl label="Display name" name="name" placeholder="John Doe" bind:value={displayName} />
        <button type="submit">Register</button>
    </form>
</section>
