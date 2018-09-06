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
    let globPath = "template/**/*.vue";
    let pathDir = "template(\/|\\\\)(.*?)";
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
        entryObj[item] = path.resolve(__dirname, "../template", item, "index.js");
    });
    return entryObj;
}

function addServeContent() {
    let content = [];
    getEntries().forEach(item => {
        content.push(path.resolve(__dirname, "../dist/template", item));
    });
    console.log(content, "content");
    return content;
}

let config = {
    mode: "development",
    entry: {
        "ffpage": path.resolve(__dirname, "../template/ffpage/index.js")
    },
    output: {
        filename: "[name]/[name].js",
        path: path.resolve(__dirname, "../dist/template"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
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
                    "less-loader"
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
        new ProgressBarPlugin(),
        new HtmlWebpackPlugin({
            title: "ff project",
            filename: "ffpage/index.html",
            template: "./index.tpl.html",
            chunks: ["ffpage"]
        })
    ],
    resolve: {
        extensions: ['.js', '.vue']
    }
};

// getEntries().forEach(pathname => {
//     let conf = {
//         title: "ff project",
//         filename: "index.html",
//         template: path.resolve(__dirname, "../index.html"),
//         chunks: [pathname]
//     };
//     config.plugins.push(new HtmlWebpackPlugin(conf));
// });


module.exports = config;