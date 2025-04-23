'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HackathonParticipants', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      result_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'HackathonResultsElectrics',
          key: 'id_result'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id_user'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('OlympiadParticipants', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      result_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'OlympiadResultsInformatics',
          key: 'id_result'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id_user'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.addIndex('HackathonParticipants', ['result_id', 'user_id'], {
      unique: true,
      name: 'hackathon_participants_unique'
    });

    await queryInterface.addIndex('OlympiadParticipants', ['result_id', 'user_id'], {
      unique: true,
      name: 'olympiad_participants_unique'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('HackathonParticipants');
    await queryInterface.dropTable('OlympiadParticipants');
  }
};