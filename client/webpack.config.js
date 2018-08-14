const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebPackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const path = require('path');
const dotenv = require('dotenv');

const isProduction = (process.env.NODE_ENV === "production");

module.exports = () => {

    const env = dotenv.config().parsed;

    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});
    
    return {
        entry: ['./src/index.js'],
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'bundle.js',
            publicPath: '/'
        },
        devServer: {
            historyApiFallback: true,
            port: 3000,
            contentBase: path.join(__dirname, 'public'),
            proxy: {
                '/api': 'http://localhost:5000'
            },
            overlay: true
        },
        optimization: {
            minimize: true,
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    }, {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            }
                        }
                    }]
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new CleanWebpackPlugin(['build/*']),
            new CompressionPlugin({
                algorithm: 'gzip',
                deleteOriginalAssets: isProduction
            }),
            new HtmlWebPackPlugin({
                inject: true,
                template: './public/index.html'
            }),
            new CopyWebPackPlugin([
                {
                    from: 'public',
                    ignore: ['index.html']
                }
            ]),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.HotModuleReplacementPlugin()
        ]
    }
}