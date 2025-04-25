const { Router } = require('express'); // ✅ Правильный импорт
const router = Router(); // ✅ Создание главного роутера

// Подключение отдельных маршрутов
const userRouter = require('./userRouter');
const topicRouter = require('./topicRouter');
const sectionRouter = require('./sectionRouter');
const projectRouter = require('./projectRouter');
const postRouter = require('./postRouter');
const materialRouter = require('./materialRouter');
const lessonRouter = require('./lessonRouter');
const journalRouter = require('./journalRouter');
const groupRouter = require('./groupRouter');
const forumRouter = require('./forumRouter');
const competitionRouter = require('./competitionRouter');
const scheduleRouter = require('./scheduleRouter');
const electiveInformaticsRouter = require('./electiveInformaticsRouter');
const careerGuidanceRouter = require('./careerGuidanceRouter');
const internshipRouter = require('./internshipRouter');

// Основные маршруты
router.use('/user', userRouter);
router.use('/topic', topicRouter);
router.use('/section', sectionRouter);
router.use('/projects', projectRouter);
router.use('/post', postRouter);
router.use('/materials', materialRouter);
router.use('/lessons', lessonRouter);
router.use('/journal', journalRouter);
router.use('/groups', groupRouter);
router.use('/forum', forumRouter);
router.use('/competitions', competitionRouter);
router.use('/schedule', scheduleRouter);
router.use('/electives', electiveInformaticsRouter);
router.use('/career-guidance', careerGuidanceRouter);
router.use('/internship', internshipRouter);

module.exports = router;
