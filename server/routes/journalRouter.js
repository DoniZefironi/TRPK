const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');

// Получение всех оценок с возможностью фильтрации
router.get('/:course', 
  journalController.getAllGrades
);

// Получение конкретной оценки по ID
router.get('/:course/grade/:id', 
  journalController.getGradeById
);

// Получение оценок конкретного студента
router.get('/:course/student/:userId', 
  journalController.getStudentGrades
);

// Получение оценок по конкретной лекции
router.get('/:course/lecture/:lectureId', 
  journalController.getLectureGrades
);

// Добавление новой оценки
router.post('/:course', 
  journalController.addGrade
);

// Обновление оценки
router.put('/:course/:id', 
  journalController.updateGrade
);

// Удаление оценки
router.delete('/:course/:id', 
  journalController.deleteGrade
);

module.exports = router;