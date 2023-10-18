'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [{
      name: 'Negócios',
      highlighted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Autoajuda',
      highlighted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Ficção',
      highlighted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Biografia',
      highlighted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Culinária',
      highlighted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Hq e Mangás',
      highlighted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Saúde',
      highlighted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Romance',
      highlighted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
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
