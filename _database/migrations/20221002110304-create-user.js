'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          min: 5,
          notContains: 'admin'
        }
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      date_of_birth: {
        allowNull: false,
        type: Sequelize.DATE,
        validate: {
          isAfter: "1940-01-01"
        }
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isAlpha: true,
        }
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isAlpha: true,
        }
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          min: 8
        }
      },
      //not sure how to use it
      remember_token: {
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
    await queryInterface.dropTable('Users');
  }
};