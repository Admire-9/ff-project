const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
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

let config = {
    mode: "development",
    entry: addEntries(),
    output: {
        filename: "[name]/[name].js",
        path: path.resolve(__dirname, "../dist/template/")
    },
    module: {
        rules: [
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
                test: /\.vue/,
                use: "vue-loader"
            },
            {
                test: /\.js/,
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
    serve: {
        content: [path.resolve(__dirname, "../dist/template/")],
        add: (app) => {
            console.log("in");
        },
        port: "3002"
    }
};

getEntries().forEach(pathname => {
    let conf = {
        title: "ff project",
        filename: path.join(pathname, "index") + ".html",
        template: path.resolve(__dirname, "../index.html"),
        chunks: [pathname]
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = config;