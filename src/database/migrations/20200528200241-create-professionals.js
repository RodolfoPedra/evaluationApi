'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
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

     return queryInterface.dropTable('professionals');
  }
};
