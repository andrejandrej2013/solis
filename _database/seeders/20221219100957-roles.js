'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('roles', [
      {
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'teacher',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'moderator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
