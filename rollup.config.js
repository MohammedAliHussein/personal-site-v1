export default [
    {
        input: './src/js/Driver.js',
        output: {
            file: './src/bundle/bundle.js',
            format: 'esm'
        },
        external: ['animejs']
    }
]