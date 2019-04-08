'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('roles', { 
      id: {  type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: {  type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('roles');
  }
};
