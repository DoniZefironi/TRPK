'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('JournalElectric', {
      fields: ['id_user'],
      type: 'foreign key',
      name: 'journal_electric_user_fk',
      references: {
        table: 'Users',
        field: 'id_user'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    
    await queryInterface.addConstraint('JournalElectric', {
      fields: ['id_classes'],
      type: 'foreign key',
      name: 'journal_electric_lecture_fk',
      references: {
        table: 'LectureElectric',
        field: 'id_classes'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    
    // Повторите для других журналов (IoT, Informatics)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('JournalElectric', 'journal_electric_user_fk');
    await queryInterface.removeConstraint('JournalElectric', 'journal_electric_lecture_fk');
    // ... аналогично для других журналов
  }
};