const production = !process.env.ROLLUP_WATCH;

module.exports = {
    mode: 'jit',
    purge: {
        content: ['./src/**/*.svelte'],
        enabled: production, // disable purge in dev
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                highlight: 'var(--highlight)',
                accent: 'var(--accent)',
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                gray: 'var(--gray)',
                'light-gray': 'var(--light-gray)',
                hover: 'var(--hover)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
    future: {
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true,
    },
};
