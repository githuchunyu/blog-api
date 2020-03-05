'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config1 = require(__dirname + '/../../database/config.json')[env];
const config2 = require(__dirname + '/../config/index.js').model;
const db = {};

const config = { ...config1, ...config2 };

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 连接数据库
// sequelize.authenticate().then(() => {
//   console.log('连接数据库成功')
// }).catch(err => {
//   console.log('连接数据库失败', err)
// })
// 同步数据库
// sequelize.sync({ alter: true })

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
