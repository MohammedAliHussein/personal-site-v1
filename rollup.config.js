export default [
    {
        input: './src/js/Driver.js',
        output: {
            file: './dist/js/main.js',
            format: 'esm'
        },
        external: ['animejs']
    }
]