const Router = require('express');
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

// Создание проекта (требует аутентификации)
router.post('/:course', 
    projectController.createProject
);

// Получение списка проектов (доступно всем)
router.get('/:course', projectController.getProjects);

// Получение информации о проекте (доступно всем)
router.get('/:course/:id', projectController.getProject);

// Обновление проекта (требует аутентификации и прав создателя/админа)
router.put('/:course/:id', 
    projectController.updateProject
);

// Удаление проекта (требует аутентификации и прав создателя/админа)
router.delete('/:course/:id', 
    projectController.deleteProject
);

// Добавление участника в проект (требует аутентификации и прав создателя/админа)
router.post('/:course/:id/team', 
    projectController.addTeamMember
);

// Удаление участника из проекта (требует аутентификации и прав создателя/админа)
router.delete('/:course/:id/team/:userId', 
    projectController.removeTeamMember
);

module.exports = router;