'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // bulkInsert --> inserção em massa direto no banco
    // O bulk significa em massa, seja delete, insert e afins

    await queryInterface.bulkInsert('categories',
      [
        {
          description: 'Web Front-End',
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          description: 'Web Back-End',
          created_at: new Date(),
          updated_at: new Date(),
        },
        
        {
          description: 'Mobile Back-End',
          created_at: new Date(),
          updated_at: new Date(),
        },
        
        {
          description: 'Mobile Front-End',
          created_at: new Date(),
          updated_at: new Date(),
        },
        
        {
          description: 'Sistemas Operacionais',
          created_at: new Date(),
          updated_at: new Date(),
        },
        
        {
          description: 'Hardware',
          created_at: new Date(),
          updated_at: new Date(),
        },
        
        {
          description: 'Redes',
          created_at: new Date(),
          updated_at: new Date(),
        },
        
        {
          description: 'Banco de Dados',
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          description: 'Teste de softwares',
          created_at: new Date(),
          updated_at: new Date(),
        },
        
        {
          description: 'Projetos',
          created_at: new Date(),
          updated_at: new Date(),
        }
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null);
  }
};