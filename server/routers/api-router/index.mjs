import Router from "koa-router";

const router = new Router();

router.get("/",async (ctx, next) => {
    ctx.body = "hello world";
    return await ctx.render("ffpage/index");
});

export default router;