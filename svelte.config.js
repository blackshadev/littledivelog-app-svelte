const sveltePreprocess = require('svelte-preprocess');

// Used for svelte-jester
module.exports = {
    preprocess: sveltePreprocess({
        sourceMap: true,
        scss: true,
    }),
};
