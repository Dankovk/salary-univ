const path = require('path');
const Dotenv = require('dotenv-webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';
const mode = NODE_ENV === 'production' ? 'production' : 'development';

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const rootPath = '/';

const autoprefixer = require('autoprefixer');

const BASE_PATH = JSON.stringify('/');
const babelConfig = require('./babel.config');
const JavaScriptObfuscator = require('webpack-obfuscator');

const config = {
    path: {
        root:   path.join(__dirname, '.'),
        src:    path.join(__dirname, './src'),
        dist:   path.join(__dirname, './dist'),
        public: path.join(__dirname, './public')
    },
    server: {
        port: 3000,
        host: 'localhost'
    }
};

module.exports = {
    entry: {
        main: [
            'whatwg-fetch',
            `${ config.path.src }/index.tsx`
        ]
    },
    output: {
        path:          config.path.public,
        publicPath:    '/',
        filename:      'static/js/[hash].bundle.js',
        chunkFilename: 'static/js/[name].[hash].bundle.js'
    },
    mode,
    optimization: {
        splitChunks: {
            chunks:      'all',
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    },
    node: {
        fs:   'empty',
        // buffer: 'empty',
        // http: 'empty',
        path: 'empty'
    },
    module: {
        rules: [
            {
                test:    /\.(js|jsx|mjs|ts|tsx)?$/,
                exclude: /node_modules/,
                use:     {
                    loader:  'babel-loader',
                    options: babelConfig
                }
            },
            {
                test: /\.svg$/,
                use:  [
                    'cache-loader',
                    {
                        loader:  'babel-loader',
                        options: babelConfig
                    },
                    {
                        loader:  'react-svg-loader',
                        options: {
                            jsx:  true, // true outputs JSX tags
                            svgo: {
                                plugins: [
                                    { removeViewBox: false }
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|otf)$/,
                use:  [
                    {
                        loader:  'url-loader',
                        options: {
                            limit: 10000,
                            name:  'static/media/[name].[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff2|woff|ttf)$/,
                use:  [
                    {
                        loader:  'file-loader',
                        options: { name: 'static/media/[name].[hash].[ext]' }
                    }
                ]
            },
            // {
            //   test: /\.(png|svg|jpg|gif)$/,
            //   use: [
            //     {
            //       loader: 'file-loader',
            //       options: {
            //         name: '[name].[ext]',
            //       },
            //     },
            //   ],
            // },
            {
                test: /\.(mov|mp4|wav|mp3)$/,
                use:  [
                    {
                        loader:  'file-loader',
                        options: { name: '[name].[ext]' }
                    }
                ]
            },
            {
                test: /\.(gltf|glb|bin)$/,
                use:  [
                    {
                        loader:  'file-loader',
                        options: { name: '[name].[ext]' }
                    }
                ]
            },
            // stylesheet for global classes from external dependencies like react-md
            {
                test: path.resolve(__dirname, 'src/index.scss'),
                use:  [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    {
                        loader:  'postcss-loader',
                        options: {
                            ident:   'postcss',
                            plugins: [ autoprefixer ]
                        }
                    },
                    {
                        loader:  'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [
                                    path.resolve('./node_modules')
                                ]
                            }
                        }
                    }
                ]
            },
            // stylesheets for application-specific stylesheets
            {
                test: /\.(css|scss)$/,
                // exclude: path.resolve(__dirname, 'src/styles/'),
                use:  [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader:  'css-loader',
                        options: {
                            // modules: {
                            //   localIdentName,
                            // },
                            importLoaders: 1
                            // minimize: true
                        }
                    },
                    {
                        loader:  'postcss-loader',
                        options: {
                            ident:   'postcss',
                            plugins: [
                                autoprefixer
                                // make sure TagThat's stylesheets take precedence over react-md and .dark react-md
                                // increaseSpecificity({ repeat: 1, stackableRoot: ':global(.wasmproject)' })
                            ]
                        }
                    },
                    {
                        loader:  'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [
                                    path.resolve('./node_modules')
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test:    /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use:     [
                    'raw-loader',
                    'glslify-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.mjs', '.ts', '.tsx' ],
        modules:    [ config.path.src, 'node_modules' ],
        alias:      {
            '~':         config.path.src
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: path.resolve(__dirname, './public/index.html')
        }),
        new JavaScriptObfuscator(),
        new MiniCssExtractPlugin({ filename: '[name].css' }),
        new Dotenv(),

    ],
    // devtool: 'eval-source-map',
    devServer: {
        contentBase:        path.join(__dirname, 'public'),
        compress:           true,
        port:               8081,
        disableHostCheck:   true,
        host:               '0.0.0.0',
        historyApiFallback: true
    }
};
