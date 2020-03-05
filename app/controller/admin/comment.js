// 评论
const getComments = async ctx => {
  return '获取评论列表'
}

const removeComment = async ctx => {
  return '删除评论'
}

const getForbid = async ctx => {
  return '获取违禁词'
}

const setForbid = async ctx => {
  return '设置违禁词'
}

module.exports = {
  getComments,
  removeComment,
  getForbid,
  setForbid
}