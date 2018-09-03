import Koa from "koa";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import views from "koa-views";
import webpackServe from "webpack-serve";
import Router from "koa-router";
import serve from "koa-static";
import path from "path";
import viewRouter from "./routers/view-router";
import apiRouter from "./routers/api-router";

const webpackConfig = require("../webpack/webpack.dev");
const app = new Koa();
const resource = serve(path.join(__dirname, "/dist"));

// Logger
app.use(logger());

app.use(bodyParser());

webpackServe({},{config: webpackConfig});

app.use(resource);

app.use("/", viewRouter.routers(), viewRouter.allowedMethods());
app.use("/api", apiRouter.routers(), apiRouter.allowedMethods());

app.on('error', function(err, ctx){
    log.error('server error', err, ctx);
});



app.listen(8090, () => {console.log("已开启8090端口")})