import Koa from "koa";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import serverStatic from "koa-static";
import views from "koa-views";
import webpack from "webpack";
import koaWebpack from "koa-webpack";

const path = require('path');
const Koa = require("koa");
const koaWebpack = require("koa-webpack");
const webpackConfig = require("../webpack/webpack.dev");
const compiler = webpack(webpack_config);
const app = new Koa();
// Logger
app.use(logger());

app.use(bodyParser());

const webpackMiddleware = koaWebpack({
    compiler: compiler,
    devMiddle: {
        publicPath: webpackConfig.output.path
    },
    hotClient: {
        autoConfigure: true,
    }
});

app.listen(8090, () => {console.log("已开启8090端口")})