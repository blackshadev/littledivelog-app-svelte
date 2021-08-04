const production = !process.env.ROLLUP_WATCH;

module.exports = {
    syntax: 'postcss-scss',

    plugins: [
        require('postcss-import'),
        require('postcss-autoreset')('sizes'),
        require('postcss-normalize')(),
        require('tailwindcss/nesting')(require('postcss-nesting')),
        require('tailwindcss'),
        require('autoprefixer'),
        require('postcss-preset-env')({
            features: { 'nesting-rules': false },
        }),
        production &&
            require('purgecss')({
                content: ['./**/*.html', './**/*.svelte'],
                defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
            }),
    ],
};
