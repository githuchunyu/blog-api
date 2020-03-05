'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('users', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          username: Sequelize.STRING,
          // 显示的昵称
          nickname: Sequelize.STRING,
          // 头像
          avatar: Sequelize.STRING,
          email: Sequelize.STRING,
          phone: Sequelize.STRING,
          password: Sequelize.STRING,
          // 个人简介
          intro: Sequelize.STRING,
          // 验证码
          code: Sequelize.STRING,
          // 验证码过期时间
          codeExpired: Sequelize.DATE,
          // 登录凭证
          token: Sequelize.STRING,
          // 凭证过期时间
          expiredAt: Sequelize.DATE,
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
          }
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('users', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};