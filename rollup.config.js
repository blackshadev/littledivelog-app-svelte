import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import alias from '@rollup/plugin-alias';
import path from 'path';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;
console.log('production ', production);

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true,
            });

            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        },
    };
}

const projectRootDir = path.resolve(__dirname);

export default {
    input: 'src/main.ts',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js',
    },
    plugins: [
        alias({
            entries: [
                { find: '@pages', replacement: `${projectRootDir}/src/pages` },
                { find: '@components', replacement: `${projectRootDir}/src/components` },
                { find: '@styling', replacement: `${projectRootDir}/src/styling` },
                { find: '@root', replacement: `${projectRootDir}/src/` },
                { find: '@routing', replacement: `${projectRootDir}/src/routing` },
            ],
        }),
        replace({
            preventAssignment: true,
            values: {
                'process.env.NODE_ENV': production ? '"production"' : '"dev"',
            },
        }),
        svelte({
            preprocess: sveltePreprocess({
                sourceMap: !production,
                scss: true,
                typescript: {
                    tsconfigFile: './tsconfig.build.json',
                },
            }),
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !production,
            },
        }),
        // we'll extract any component CSS out into
        // a separate file - better for performance
        css({ output: 'bundle.css' }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte'],
        }),
        commonjs(),
        typescript({
            sourceMap: !production,
            inlineSources: !production,
            tsconfig: './tsconfig.build.json',
        }),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),
    ],
    watch: {
        clearScreen: false,
    },
};
