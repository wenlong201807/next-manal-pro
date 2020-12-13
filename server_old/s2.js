const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


const server = new Koa()
const router = new Router()

router.get('/test/:id', (ctx) => {
  let id = ctx.params.id
  // ctx.body = `<span>koa server${id}</span>` // 返回到页面的内容

  ctx.body = {
    success:true,
  }
  ctx.set('Content-Type','application/json')
})

server.use(async (ctx, next) => { // 统一使用异步方式
  // const path = ctx.path // 获取路径  浏览器中的
  // const method = ctx.method // 获取路径  浏览器中的

  // ctx.body = `<span>koa server,render${path}--${method}</span>` // 返回到页面的内容
  await next() // 写这一行，才能执行后面的中间件
})

server.use(router.routes())

server.listen(3001, () => {
  console.log('koa server listening on 3001...')
})
