'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      username: 'root',
      nickname: '管理员',
      email: '',
      phone: '',
      avatar: '',
      password: '123456',
      intro: '',
      code: '',
      codeExpired: new Date(),
      token: '',
      expiredAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
