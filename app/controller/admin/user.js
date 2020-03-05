// 用户
const crypto = require('crypto')

// 登录
const login = async ctx => {
  const params = ctx.request.body
  const user = await ctx.model.User.findOne({
    where: {
      username: params.username,
      password: params.password
    }
  })
  if (user) {
    // 生成并设置客户端token
    const token = crypto.createHash('md5').update(user.username).digest('hex')
    const expiredAt = new Date().getTime() + 7 * 24 * 3600 * 1000
    await ctx.model.User.update({ token, expiredAt }, {
      where: { id: user.id },
      silent: true
    })
    ctx.cookies.set('token', token)
    user.token = token
    return user
  }
  throw { type: 'UNCORRECT_LOGIN' }
}

// 退出登录
const logout = async ctx => {
  await ctx.model.User.update({ token: '', expiredAt: new Date() }, {
    where: { id: ctx.user.id },
    silent: true
  })
  ctx.cookies.set('token', '')
}

// 获取用户信息
const getInfo  = async ctx => {
  return ctx.user
}

// 设置用户信息
const setInfo  = async ctx => {
  return '设置用户信息'
}

const sendSms = async ctx => {
  const md5 = crypto.createHash('md5')
  const smsapi="api.smsbao.com"
  // 短信平台账号
  const user="huchunyu"
  // 短信平台密码
  const password="chunyu520"
  // 要发送的短信内容
  const content="【看生活】尊敬的客户，您的验证码是1234，请于5分钟内正确输入。如非本人操作，请忽略此短信。"
  // 要发送短信的手机号码
  const phone="18116264116"
  const pass = md5.update(password).digest('hex')
  let data={
      'u': user,  
      'p': pass,
      'm': phone,
      'c': content
  }
  data = querystring.stringify(data)
  const options={  
      hostname: smsapi,   
      path: '/sms?' + data,  
      method: 'GET'  
  } 
  const req = http.request(options, function (res) {  
      res.setEncoding('utf-8')
      res.on('data', function (result) {
        console.log(result)
      })
      res.on('end', function () {  
      })
  })
  req.on('error', function (err) {  
    console.error(err) 
  })
  req.end()
}

module.exports = {
  login,
  logout,
  getInfo,
  setInfo,
  sendSms
}
