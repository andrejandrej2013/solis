'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('en_lv_joins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lv_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'lv_words',
          key: 'id'
        }
      },
      en_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'en_words',
          key: 'id'
        }
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
    await queryInterface.dropTable('en_lv_joins');
  }
};