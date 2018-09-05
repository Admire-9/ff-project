"use strict";

import Router from 'koa-router';
import view from './view-router';
import api from './api-router';

const router = new Router();

router.use("/", view.routes(), api.allowedMethods());
router.use("/api", api.routes(), api.allowedMethods());

// router.get('*', async (ctx, next) => {
//     await next();

//     let extname = path.extname(ctx.path);
//     extname = extname ? mimes[extname.slice(1)] : "";
    
//     if(ctx.status === 404 && !extname) {
//         await ctx.render("index");
//     }
// });

export default router.routes();