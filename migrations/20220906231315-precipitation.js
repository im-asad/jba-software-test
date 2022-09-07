'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('precipitations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Xref: {
        type: Sequelize.INTEGER,
      },
      Yref: {
        type: Sequelize.INTEGER,
      },
      Date: {
        type: Sequelize.STRING,
      },
      Value: {
        type: Sequelize.INTEGER,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('precipitations');
  }
};
