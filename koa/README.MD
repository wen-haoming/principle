
## 从零实现Koa

- context(属性代理-完整上下文处理能力)
- middleWare(compose组合能力)

### 1. 实现ctx原理(属性代理)

- Koa中ctx里面融合了request,response,req,res等等的方法

  - 要理解这几个方法到底有何差别的同时, 就能很好理解api设计的背后逻辑。

       因为我们遵循着middlwWare的特性, 如果全部方法都存入了ctx一个上下文里面,对于后续的中间件也能够同时获取

       ```js
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
       ```
       以上的调用方法都是同一个结果,这样的调用简直就是套娃... `ctx.req` 又有`ctx.request `,不过从代用上我们不难发现规律
       - `req` `res` 属性并没有继续扩展，而api上只是在`request` 和`response` 上扩展了req的方法。
       -  (`request`||`req`) + (`response`||`res`) = `ctx` 都具备相同的api

    从源码上不难看出使用了`__defineGetter__` 来实现属性获取代理, 使用了`defineProperty` 来实现属性代理重写

### 2. 实现use原理 