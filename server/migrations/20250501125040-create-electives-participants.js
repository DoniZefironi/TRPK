'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Проверяем существование таблицы ElectiveUser
    const tableExists = await queryInterface.showAllTables()
      .then(tables => tables.includes('ElectiveUser'));

    if (!tableExists) {
      // Создаем промежуточную таблицу
      await queryInterface.createTable('ElectiveUser', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        id_elective: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'ElectiveInformatics',
            key: 'id_elective'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        id_user: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id_user'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });

      // Добавляем уникальный индекс
      await queryInterface.addIndex('ElectiveUser', {
        fields: ['id_elective', 'id_user'],
        unique: true,
        name: 'elective_user_unique'
      });
    }
  },

  async down(queryInterface, Sequelize) {
    // Удаляем таблицу
    await queryInterface.dropTable('ElectiveUser');
  }
};