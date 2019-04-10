'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('user_roles', { 
        id: {  type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        role_id: {  type: Sequelize.INTEGER },
        user_id: {  type: Sequelize.INTEGER },
      });
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('user_roles');
  }
};
