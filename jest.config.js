module.exports = {
    testEnvironment: 'node',
    testEnvironmentOptions: {
        NODE_ENV: 'DEV',
    },
    restoreMocks: true,
    coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.js', 'tests'],
    coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
