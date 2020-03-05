const app = require('./app')
const admin = require('./admin')

const welcome = async (ctx, next) => {
  return '欢迎您'
}

module.exports = {
  welcome,
  app,
  admin
}
