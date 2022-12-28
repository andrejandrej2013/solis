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
        type: Sequelize.INTEGER,
        references: {
          model: 'laiks',
          key: 'id'
        }
      },
      skaitlis_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'skaitlis',
          key: 'id'
        }
      },
      word_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'lv_words',
          key: 'id'
        }
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