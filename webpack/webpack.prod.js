let path = require("path");

const config = {
    entry: {
        home:  __dirname + "/template/home/index.js",
        ffpage:  __dirname + "/template/ffpage/index.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "/dist/template")
    }
};

module.exports = config;