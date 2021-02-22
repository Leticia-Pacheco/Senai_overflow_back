'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("questions", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gist: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      // A chave estrangeira vem da tabela aluno para a tabela de perguntas
      // References --> de onde está vindo
      // model --> nome da tabela
      // key --> campo que traremos da tabela
      
      student_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "students",
          key: "id"
        },

        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("questions");
  }
};