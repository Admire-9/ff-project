import Router from "koa-router";

const router = new Router();

router.get("/", (ctx, next) => {
    // ctx.body = "hello user";
    return ctx.render("ffpage/index");
});

export default router;