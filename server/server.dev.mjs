import Koa from "koa";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import serverStatic from "koa-static";
import views from "koa-views";
import webpackServe from "webpack-serve";

// const path = require('path');
// const Koa = require("koa");
// const koaWebpack = require("koa-webpack");
const webpackConfig = require("../webpack");
const app = new Koa();
// Logger
app.use(logger());

app.use(bodyParser());

webpackServe({},{config: webpackConfig});

app.listen(8090, () => {console.log("已开启8090端口")})