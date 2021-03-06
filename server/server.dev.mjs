import Koa from "koa";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import views from "koa-views";
import webpackServe from "webpack-serve";
import serve from "koa-static";
import path, { resolve } from "path";
import routers from './routers';
import apolloServer from './schemas';
const webpackConfig = require("../webpack/webpack.dev");
const app = new Koa();
const resourceView = serve(path.join(__dirname, "../dist/src"));
const resouceLib = serve(path.join(__dirname, "../"));
// Logger
app.use(logger());

app.use(bodyParser());

app.use(resourceView);
app.use(resouceLib);
app.use(views(path.resolve(__dirname, "../dist/src"), {map: {html: "ejs"}}));
webpackServe({},{config: webpackConfig});
apolloServer.applyMiddleware({ app });
app.use(routers);


app.on('error', function(err, ctx){
    console.log(err, "err");
});


app.listen(3003, () => {console.log(`listen 3003 ${apolloServer.graphqlPath}`)});