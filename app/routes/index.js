const c = require('../controller')
const common = require('../middleware/common')

/*
 * 路由配置
 * route[0] - 请求方法
 * route[1] - 路径
 * route[2] - 控制器
 * route[3] - 中间件
 */
const routes = [
  // 欢迎，测试用
  ['get', '/', c.welcome, [common()]],

  /*
   * 前台路由，统一用"/app"开始
   */
  // 获取网站基本信息
  ['get', '/app/info', c.app.getInfo, [common()]],
  // 获取博客分类
  ['get', '/app/blog/cats', c.app.getBlogCats, [common()]],
  // 获取文章列表，包含各种搜索
  ['get', '/app/blog/articles', c.app.getBlogArticles, [common()]],
  // 获取文章详情
  ['get', '/app/blog/article', c.app.getBlogArticle, [common()]],
  // 发送统计
  ['post', '/app/stats', c.app.setStats, [common()]],
  // 查看评论
  ['get', '/app/comments', c.app.getComments, [common()]],
  // 发表评论
  ['post', '/app/comment', c.app.setComment, [common()]],

  /*
   * 后台路由，统一由"/admin"开始
   */
  // 登录
  ['post', '/admin/user/login', c.admin.user.login, [common()]],
  // 登出
  ['post', '/admin/user/logout', c.admin.user.logout, [common({ auth: true })]],
  // 发送短信验证码
  ['post', '/admin/user/sms', c.admin.user.sendSms, [common()]],
  // 获取信息
  ['get', '/admin/user/info', c.admin.user.getInfo, [common({ auth: true })]],
  // 设置个人信息
  ['post', '/admin/user/info', c.admin.user.setInfo, [common({ auth: true })]],
  // 上传文件，比如头像，图片一类的
  ['post', '/admin/picture/upload', c.admin.picture.upload, [common({ auth: true })]],
  // 获取图片文件夹和文件
  ['post', '/admin/picture/list', c.admin.picture.getList, [common({ auth: true })]],
  // 创建图片文件夹
  ['post', '/admin/picture/album/add', c.admin.picture.addAlbum, [common({ auth: true })]],
  // 删除图片文件夹
  ['post', '/admin/picture/album/remove', c.admin.picture.removeAlbum, [common({ auth: true })]],
  // 设置图片文件夹 - 移动，改名等
  ['post', '/admin/picture/album/update', c.admin.picture.updateAlbum, [common({ auth: true })]],
  // 创建图片
  ['post', '/admin/picture/image/add', c.admin.picture.addImage, [common({ auth: true })]],
  // 删除图片
  ['post', '/admin/picture/image/remove', c.admin.picture.removeImage, [common({ auth: true })]],
  // 设置图片
  ['post', '/admin/picture/image/update', c.admin.picture.updateImage, [common({ auth: true })]],
  // 获取文章分类
  ['get', '/admin/blog/cat/list', c.admin.blog.getCats, [common({ auth: true })]],
  // 添加分类
  ['post', '/admin/blog/cat/add', c.admin.blog.addCat, [common({ auth: true })]],
  // 删除分类
  ['post', '/admin/blog/cat/remove', c.admin.blog.removeCat, [common({ auth: true })]],
  // 修改分类
  ['post', '/admin/blog/cat/update', c.admin.blog.updateCat, [common({ auth: true })]],
  // 获取文章列表
  ['get', '/admin/blog/article/list', c.admin.blog.getArticles, [common({ auth: true })]],
  // 获取文章详情
  ['get', '/admin/blog/article/detail', c.admin.blog.getArticle, [common({ auth: true })]],
  // 添加文章
  ['post', '/admin/blog/article/add', c.admin.blog.addArticle, [common({ auth: true })]],
  // 删除文章
  ['post', '/admin/blog/article/remove', c.admin.blog.removeArticle, [common({ auth: true })]],
  // 修改文章
  ['post', '/admin/blog/article/update', c.admin.blog.updateArticle, [common({ auth: true })]],
  // 获取评论
  ['get', '/admin/comment/list', c.admin.comment.getComments, [common({ auth: true })]],
  // 删除评论
  ['post', '/admin/comment/remove', c.admin.comment.removeComment, [common({ auth: true })]],
  // 获取评论违禁词
  ['get', '/admin/comment/forbid', c.admin.comment.getForbid, [common({ auth: true })]],
  // 设置评论违禁词
  ['post', '/admin/comment/forbid', c.admin.comment.setForbid, [common({ auth: true })]],
  // 获取网站统计数据
  ['get', '/admin/stats', c.admin.stats.getStats, [common({ auth: true })]],
]

// 生成路由
module.exports = router => {
  routes.forEach(route => {
    router[route[0]](route[1], ...route[3], route[2])
  })
}
