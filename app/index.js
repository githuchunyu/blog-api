const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

// const views = require('koa-views')
// const co = require('co')
// const convert = require('koa-convert')
// const json = require('koa-json')
const onerror = require('koa-onerror')
const body = require('koa-body')
const logger = require('koa-logger')
const static = require('koa-static')
// const debug = require('debug')('koa2:server')
// const path = require('path')

const config = require('./config')
const routes = require('./routes')

const model = require('./models')

// 服务端口
const port = process.env.PORT || config.port
const path = require('path')

// error handler
onerror(app)

app.use(async (ctx, next) => {
  ctx.model = model
  await next()
})
console.log(__dirname)
// middlewares
app.use(body({
  multipart: true,
  formidable:{
    maxFieldsSize: 1024 * 1024,
    multipart: true
  }
}))
  // .use(json())
  .use(logger())
  .use(static(path.resolve(__dirname, '../static')))
  .use(router.routes())
  .use(router.allowedMethods())

// 路由设置
routes(router)

// 错误处理
app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = () => {
  app.listen(config.port, () => {
    console.log(`Listening on http://localhost:${port}`)
  })
}
