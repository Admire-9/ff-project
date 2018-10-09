const path = require("path");
const glob = require("glob");
const convert = require("koa-connect");
const proxy = require('http-proxy-middleware');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getEntries = function() {
    let globPath = "src/**/*.vue";
    let pathDir = "src(\/|\\\\)(.*?)";
    let files = glob.sync(globPath);
    let dirname, entries = [];
    for(let i = 0; i < files.length; i++) {
        dirname = path.dirname(files[i]);
        entries.push(dirname.replace(new RegExp("^" + pathDir), "$2"));
    }
    return entries;
};

function addEntries() {
    let entryObj = {};
    getEntries().forEach(item => {
        entryObj[item] = path.resolve(__dirname, "../src", item, "index.js");
    });
    return entryObj;
}

let config = {
    mode: "development",
    entry: addEntries(),
    output: {
        filename: "[name]/[name].js",
        path: path.resolve(__dirname, "../dist/src"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: { name: '[name].[ext]?[hash]' }
            },
            {   test: /\.(woff|ttf|eot|svg)/, 
                loader: 'file-loader?name=font/[name].[ext]&publicPath=../' 
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader, //"style-loader"
                    { loader: "css-loader", options: { importLoaders: 1 } },
                    { loader: "postcss-loader", 
                      options: {
                        plugins: (loader) => [
                            require('autoprefixer')(), //CSS浏览器兼容
                        ]
                      }
                    },
                    { loader: "less-loader", options: {
                        paths: [
                            path.resolve(__dirname, 'node_modules')
                        ]
                    }}
                ]
            },
            {
                test: /\.js$/,
                exclude: file => (
                    /node_modules|bower_components/.test(file) &&
                    !/\.vue\.js/.test(file)
                ),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-transform-runtime"]
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name]/[name].css",
            chunkFilename: "[id].css"
        }),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            'Promise': 'bluebird'
        }),
        new ProgressBarPlugin()
    ],
    resolve: {
        extensions: ['.js', '.vue', '.less', '.css', '.less', 'json', '.msj', '.dev.js', '.prod.js']
    },
    serve: {
        content: addServeContent(),
        add: (app) => {
            app.use(convert(proxy('/api', { target: 'http://localhost:3003' })));
            app.use(convert(proxy('/lib', { target: 'http://localhost:3003' })));
        },
        hotClient: true,
        port: "3002"
    }
};

function addServeContent() {
    let content = [];
    getEntries().forEach(item => {
        content.push(path.resolve(__dirname, "../dist/src", item));
    });
    return content;
}


getEntries().forEach(pathname => {
    let conf = {
        title: "ff project",
        filename: pathname+"/index.html",
        template: path.resolve(__dirname, `../src/${pathname}/index.tpl.html`),
        chunks: [pathname]
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
});


module.exports = config;