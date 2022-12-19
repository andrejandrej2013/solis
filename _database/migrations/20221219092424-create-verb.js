'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('verbs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      laiks_id: {
        type: Sequelize.INTEGER
      },
      skaitlis_id: {
        type: Sequelize.INTEGER
      },
      word_id: {
        type: Sequelize.INTEGER
      },
      first_form: {
        type: Sequelize.STRING
      },
      second_form: {
        type: Sequelize.STRING
      },
      third_form: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('verbs');
  }
};