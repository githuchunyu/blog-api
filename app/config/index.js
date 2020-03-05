module.exports = {
  welcome: '欢迎使用',
  port: 3000,
  // 全局模型配置
  model: {
    // 是否添加时间戳属性 (updatedAt, createdAt)
    timestamps: true,
    // 删除数据库条目,但将新添加的属性deletedAt设置为当前日期(删除完成时). 
    // paranoid 只有在启用时间戳时才能工作
    paranoid: false,
    // 字段名是否用下划线.
    // 不会覆盖已经定义的字段选项
    underscored: false,
    // 禁用修改表名; 默认情况下,sequelize将自动将所有传递的模型名称(define的第一个参数)转换为复数. 如果你不想这样,请设置以下内容
    freezeTableName: false,
    // 启用乐观锁定. 启用时,sequelize将向模型添加版本计数属性,
    // 并在保存过时的实例时引发OptimisticLockingError错误.
    // 设置为true或具有要用于启用的属性名称的字符串.
    version: false
  }
}
