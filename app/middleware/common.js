// const isJSON = require('koa-is-json');

// 返回码
const STATUSES = {
  SUCCESS: { code: 1, msg: '成功' },
  PARAMETERS_WRONG: { code: 20, msg: '参数错误' },
  NO_LOGIN: { code: 31, msg: '未登录' },
  DATABASE_ERROR: { code: 41, msg: '数据库错误' },
  UNCORRECT_LOGIN: { code: 99, msg: '账号密码不正确' },
  UNKOWN_EXCEPTION: { code: 99, msg: '请求异常' }
}

// 统一返回数据的格式
const return_data = (status, data = {}) => {
  return {
    code: STATUSES[status].code,
    msg: STATUSES[status].msg,
    data
  }
}

module.exports = (options = {}) => {
  return async function common(ctx, next) {
    // 和默认数据合并
    options = {
      auth: false,
      ...options
    }
    // 表单验证
    const rule = options.rule
    if (rule) {
      try {
        ctx.validate(rule)
      } catch (err) {
        ctx.body = return_data('PARAMETERS_WRONG')
        return
      }
    }
    // 登录验证
    const auth = options.auth
    const token = auth !== 'none' ? (ctx.cookies.get('token') || '') : ''
    if (auth) {
      // 客户端操作
      try {
        const user = await ctx.model.user.findOne({
          where: { token }
        })
        if (user && user.expiredAt > new Date()) {
          ctx.user = user
        } else {
          ctx.body = return_data('NO_LOGIN')
          return
        }
      } catch (err) {
        console.log(err)
        ctx.body = return_data('DATABASE_ERROR')
        return
      }
    }
    // 权限验证
    // 操作日志
    // 异常处理
    try {
      const res = await next()
      ctx.body = return_data('SUCCESS', res)
    } catch (err) {
      if (err.type) {
        ctx.body = return_data(err.type)
      } else {
        // 捕获错误
        console.log(err)
        ctx.body = return_data('UNKOWN_EXCEPTION')
      }
    }
  }
}
