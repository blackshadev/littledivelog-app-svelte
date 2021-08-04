module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-recommended-scss', 'stylelint-config-prettier'],
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['import-normalise'],
            },
        ],
    },
    ignoreFiles: ['node_modules/*', 'src/assets/**', 'build/**'],
    defaultSeverity: 'error',
};
