'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('users', { 
        email: { type: Sequelize.STRING, unique: true },
        phone_number: { type: Sequelize.STRING, unique: true },
        first_name: { type: Sequelize.STRING },
        last_name: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        gender: { type: Sequelize.STRING },
        birth_date: { type: Sequelize.DATE },
        forgot_password: { type: Sequelize.STRING },
      }, {
        underscored: true
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
      */
     return queryInterface.dropTable('users');
  }
};
