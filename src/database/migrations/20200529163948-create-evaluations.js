'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

     return queryInterface.createTable('evaluations', { 
       id: {
         type: Sequelize.INTEGER,
         allowNull: false,
         autoIncrement: true,
         primaryKey: true
       },
       opinion: {
         type: Sequelize.STRING,
         allowNull: false
       },
       note: {
         type: Sequelize.INTEGER,
         allowNull: false
       },
       check: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
       },
       user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
       },
       professional_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'professionals', key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

     return queryInterface.dropTable('evaluations');
  }
};
