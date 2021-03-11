module.exports = {
    babelrc: true,
    presets: [
        [
            '@babel/preset-env', { targets: { node: 'current' } }
        ],
        '@babel/preset-typescript',
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        [ '@babel/plugin-proposal-decorators', { legacy: true } ],
        [ '@babel/plugin-proposal-class-properties', { loose: true } ],
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-transform-arrow-functions',

        [
            'react-css-modules',
            {
                // "generateScopedName": "[hash:base64]",
                filetypes: { '.scss': { syntax: 'postcss-scss' } }
            }
        ]
    ]
};
