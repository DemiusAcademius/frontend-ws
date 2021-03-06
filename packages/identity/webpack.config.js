const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv)=>({
    mode: 'development',
    entry: {
        app: './src/index.ts'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true
    },
    devtool: argv.mode === 'production'? 'none' : 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['cache-loader','ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'cache-loader',
                    'style-loader',
                    'css-loader'
                ]
            },
            {test: /\.s[a|c]ss$/, use: [{loader: "cache-loader"}, {loader: "style-loader"}, {loader: "css-loader"}, {loader: "sass-loader"}]},
            {test: /\.(png|gif|jpg|cur)$/i, loader: 'url-loader', options: {limit: 8192}},
            {
                test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loader: 'url-loader',
                options: {limit: 10000, mimetype: 'application/font-woff2'}
            },
            {
                test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loader: 'url-loader',
                options: {limit: 10000, mimetype: 'application/font-woff'}
            },
            {test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: ['cache-loader','file-loader']}
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
});
