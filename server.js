const Koa = require('koa')
// const Router = require('koa-router')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()

  server.use(async (ctx, next) => {
    await handle(ctx.req,ctx.res)
    ctx.respond = false
  })

  // server.use(router.routes())
  server.listen(3001, () => {
    console.log('koa server listening on 3001...')
  })
})