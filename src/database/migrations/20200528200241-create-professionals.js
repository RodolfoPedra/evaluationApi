'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.createTable('professionals', { 
       id: {
         type: Sequelize.INTEGER,
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
       },
       name: {
         type: Sequelize.STRING,
         allowNull: false
       },
       email: {
         type: Sequelize.STRING,
         unique: true,
         allowNull: false
       },
       workplace: {
        type: Sequelize.STRING,
        allowNull: false
       },
       password_hash: {
         type: Sequelize.STRING,
         allowNull: false
       },
       created_at: {
         type: Sequelize.DATE,
         allowNull: false
       },
       updated_at: {
        type: Sequelize.DATE,
        allowNull: false
       }
      
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.dropTable('professionals');
  }
};
