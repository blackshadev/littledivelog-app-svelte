module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-recommended-scss', 'stylelint-config-prettier'],
    rules: {},
    ignoreFiles: ['node_modules/*', 'src/assets/**', 'build/**'],
    defaultSeverity: 'error',
};
