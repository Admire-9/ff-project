import Koa from "koa";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import views from "koa-views";
import webpackServe from "webpack-serve";
import Router from "koa-router";
import serve from "koa-static";
import path from "path";
import routers from './routers';

const webpackConfig = require("../webpack/webpack.dev");
const app = new Koa();
const resource = serve(path.join(__dirname, "../dist/template"));
console.log(path.resolve(__dirname, "../dist"), "dist");
// Logger
app.use(logger());

app.use(bodyParser());

webpackServe({},{config: webpackConfig});

app.use(resource);
console.log(path.join(__dirname, "../dist/template"), "path.join(__dirname");
app.use(views(path.resolve(__dirname, "../dist/template"), {map: {html: "ejs"}}));

app.use(routers);


app.on('error', function(err, ctx){
    log.error('server error', err, ctx);
});



app.listen(8090, () => {console.log("已开启8090端口")})