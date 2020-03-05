// 前台

const getInfo = async ctx => {
  return '获取网站信息'
}

const getBlogCats = async ctx => {
  return '获取网站分类'
}

const getBlogArticles = async ctx => {
  return '获取网站文章列表'
}

const getBlogArticle = async ctx => {
  return '获取文章详情'
}

const setStats = async ctx => {
  return '发送统计数据'
}

const getComments = async ctx => {
  return '获取评论列表'
}

const setComment = async ctx => {
  return '发表评论'
}

module.exports = {
  getInfo,
  getBlogCats,
  getBlogArticles,
  getBlogArticle,
  setStats,
  getComments,
  setComment
}