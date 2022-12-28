'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nouns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deklinacija_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'deklinacijas',
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
      nominativs: {
        type: Sequelize.STRING
      },
      genitivs: {
        type: Sequelize.STRING
      },
      akuzativs: {
        type: Sequelize.STRING
      },
      instrumentalis: {
        type: Sequelize.STRING
      },
      lokativs: {
        type: Sequelize.STRING
      },
      vokativs: {
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
    await queryInterface.dropTable('nouns');
  }
};