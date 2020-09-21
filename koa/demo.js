let Koa = require('koa')

let app =  new Koa();

// 
app.use(async (ctx)=>{
   console.log('--------------')

    console.log(ctx.url)

    console.log(ctx.req.url,'ctx.req.url')
    console.log(ctx.request.url,'ctx.request.url')
    console.log(ctx.request.req.url,'ctx.request.req.url')

    console.log(ctx.response.req.url,'ctx.response.req.url')
    console.log(ctx.response.request.url,'ctx.response.request.url')

   console.log('--------------')
    /**
     * --------------
        /123123
        /123123 ctx.req.url
        /123123 ctx.request.url
        /123123 ctx.request.req.url
        /123123 ctx.response.req.url
        /123123 ctx.response.request.url
     *  --------------
     * 
     */

})


app.listen(3000,()=>{
       console.log('监听3000端口')
})