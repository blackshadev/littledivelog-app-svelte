// import nesting from "postcss-nesting";
// import postcssimport from "postcss-import";

const production = !process.env.ROLLUP_WATCH;

module.exports = {
    //   syntax: "postcss-scss",
    plugins: [
        // nesting(),
        // postcssimport(),
        require('tailwindcss'),
        require('autoprefixer'),
    ],
    //     production &&
    //       purgecss({
    //         content: ["./**/*.html", "./**/*.svelte"],
    //         defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    //       }),
    //   ],
};
