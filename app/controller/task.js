const moment = require('moment')
const utils = require('../utils')

// 获取任务列表
const getList = async ctx => {
  const params = ctx.query
  const Op = ctx.model.Sequelize.Op
  const list = await ctx.model.Task.findAll({
    include: [
      { model: ctx.model.TaskCat, required: false }
    ],
    where: {
      UserId: ctx.user.id,
      date: {
        [Op.like]: `%${params.date}%`
      }
    }
  })
  return list
}

// 获取任务列表
const getDetail = async ctx => {
  const params = ctx.query
  const res = await ctx.model.Task.findOne({
    where: { id: params.id }
  })
  return res
}

// 创建日
const addDay = async ctx => {
  const params = ctx.request.body
  await ctx.model.TaskDay.create({
    UserId: ctx.user.id,
    date: params.date
  })
  const res = ctx.model.TaskDay.findOne({
    where: {
      UserId: ctx.user.id,
      date: params.date
    }
  })
  return res
}

// 获取日列表
const getDays = async ctx => {
  const params = ctx.query
  const Op = ctx.model.Sequelize.Op
  const res = await ctx.model.TaskDay.findAll({
    where: {
      date: {
        [Op.gte]: params.from,
        [Op.lte]: params.to
      }
    }
  })
  return res
}

// 获取日
const getDay = async ctx => {
  const params = ctx.query
  const res = await ctx.model.TaskDay.findOne({
    where: {
      UserId: ctx.user.id,
      date: params.date
    }
  })
  return res || {}
}

// 获取任务分类
const getCats = async ctx => {
  const list = await ctx.model.TaskCat.findAll({
    where: {
      UserId: ctx.user.id
    }
  })
  return list
}

// 获取常规任务
const getCommons = async ctx => {
  const list = await ctx.model.TaskCommon.findAll({
    include: [
      { model: ctx.model.TaskCat, required: false }
    ],
    where: {
      UserId: ctx.user.id
    }
  })
  return list.map(item => {
    item = item.toJSON()
    item.catId = item.TaskCatId
    item.catTitle = item.TaskCat ? item.TaskCat.title : '默认'
    delete item.TaskCatId
    delete item.TaskCat
    return item
  })
}

// 获取阶段任务
const getPeriods = async ctx => {
  const list = await ctx.model.TaskPeriod.findAll({
    where: {
      UserId: ctx.user.id
    }
  })
  return list
}

// 获取任务注释
const getComments = async ctx => {
  const params = ctx.query
  const list = await ctx.model.TaskComment.findAll({
    where: {
      TaskId: params.task_id,
      UserId: ctx.user.id
    }
  })
  return list
}

// 新建任务
const addTask = async ctx => {
  const params = ctx.request.body
  const data = {
    UserId: ctx.user.id,
    TaskPeriodId: null,
    date: params.date,
    title: params.title,
    content: params.content,
    level: params.level,
    actionType: params.actionType,
    score: 0,
    status: 0
  }
  if (params.taskCatId !== 'none') {
    data.TaskCatId = params.taskCatId
  }
  if (params.deadline) {
    data.deadline = moment(params.deadline).toDate()
  }
  const task = await ctx.model.Task.create(data)
  // 如果没有这一天的记录，同时要创建天
  await ctx.model.TaskDay.findOrCreate({
    where: { UserId: ctx.user.id, date: params.date },
    default: {
      UserId: ctx.user.id,
      date: params.date
    }
  })
  return task
}

const updateTask = async ctx => {
  const params = ctx.request.body
  const data = utils.getData(params, {
    exclude: ['id']
  })
  await ctx.model.Task.update({
    ...data
  }, {
    where: { id: params.id }
  })
  return await ctx.model.Task.findOne({ where: { id: params.id } })
}

const updateDay = async ctx => {
  const params = ctx.request.body
  const data = utils.getData(params, {
    exclude: ['date']
  })
  await ctx.model.TaskDay.update({
    ...data
  }, {
    where: { UserId: ctx.user.id, date: params.date }
  })
  return await ctx.model.TaskDay.findOne({ where: { UserId: ctx.user.id, date: params.date } })
}

// 新建任务分类
const saveCat = async ctx => {
  const params = ctx.request.body
  const data = utils.getData(params, {
    exclude: ['id']
  })
  let cat = {}
  const id = parseInt(params.id)
  if (id === 0) {
    data.status = 1
    data.UserId = ctx.user.id
    cat = await ctx.model.TaskCat.create(data)
  } else {
    await ctx.model.TaskCat.update(data, {
      where: { id }
    })
    cat = await ctx.model.TaskCat.findOne({
      where: { id }
    })
  }
  return cat
}

// 新建任务常规任务
const saveCommon = async ctx => {
  const params = ctx.request.body
  const data = utils.getData(params, {
    exclude: ['id']
  })
  let cat = {}
  const id = parseInt(params.id)
  if (id === 0) {
    data.status = 1
    data.UserId = ctx.user.id
    cat = await ctx.model.TaskCommon.create(data)
  } else {
    await ctx.model.TaskCommon.update(data, {
      where: { id }
    })
    cat = await ctx.model.TaskCommon.findOne({
      include: [
        { model: ctx.model.TaskCat, required: false }
      ],
      where: { id }
    })
  }
  return cat
}

module.exports = {
  getList,
  getDetail,
  addDay,
  getDays,
  getDay,
  getCats,
  getCommons,
  saveCommon,
  getPeriods,
  getComments,
  addTask,
  updateTask,
  updateDay,
  saveCat
}
