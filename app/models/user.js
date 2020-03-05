'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    nickname: DataTypes.STRING,
    avatar: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    // 个人简介
    intro: DataTypes.STRING,
    // 登录凭证
    token: DataTypes.STRING,
    // 凭证过期时间
    expiredAt: DataTypes.DATE,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};