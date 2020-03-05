'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    // 登录的用户名
    username: DataTypes.STRING,
    // 显示的昵称
    nickname: DataTypes.STRING,
    // 头像
    avatar: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    // 个人简介
    intro: DataTypes.STRING,
    // 验证码
    code: DataTypes.STRING,
    // 验证码过期时间
    codeExpired: DataTypes.DATE,
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