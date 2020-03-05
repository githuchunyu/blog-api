// 从原始数据里摘取或去除数据
const getData = (origin, options) => {
  const res = {}
  Object.keys(origin).forEach(key => {
    if (!options.exclude.includes(key)) {
      res[key] = origin[key]
    }
  })
  return res
}

module.exports = {
  getData
}