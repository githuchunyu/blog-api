// 图床

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

// 上传文件
const upload = async ctx => {
  const file = ctx.request.files.file
  // 创建可读流
  const render = fs.createReadStream(file.path)
  // 文件后缀不变
  // 文件名md5
  const ext = file.name.split('.').pop()
  const filename = crypto.createHash('md5').update(String(new Date().getTime())).digest('hex') + '.' + ext
  const filePath = path.join(__dirname, '../../static/storage/', filename)
  // 创建写入流
  const upStream = fs.createWriteStream(filePath)
  render.pipe(upStream)
  return '/storage/' + filename
}

const getList = async ctx => {
  return '获取文件（夹）列表'
}

const addAlbum = async ctx => {
  return '添加文件夹'
}

const removeAlbum = async ctx => {
  return '删除文件夹'
}

const updateAlbum = async ctx => {
  return '修改文件夹'
}

const addImage = async ctx => {
  return '添加图片'
}

const removeImage = async ctx => {
  return '删除图片'
}

const updateImage = async ctx => {
  return '修改图片'
}

module.exports = {
  upload,
  getList,
  addAlbum,
  removeAlbum,
  updateAlbum,
  addImage,
  removeImage,
  updateImage
}