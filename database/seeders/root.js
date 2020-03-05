'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      username: 'root',
      nickname: 'admin',
      email: '',
      avatar: '',
      password: '123456',
      intro: '',
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
