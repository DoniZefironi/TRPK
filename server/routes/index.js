const { Router } = require('express') // Правильный импорт
const router = Router() // ✅ Правильное создание роутера

// Основные роуты
const userRouter = require('./userRouter')
const materialRouter = require('./materialRouter')

// Electric роуты
const hackathonElectricRouter = require('./RoutesForElectric/hackathonElectricRouter')
const classesElectricRouter = require('./RoutesForElectric/classesElectricRouter')
const groupElectricRouter = require('./RoutesForElectric/groupElectricRouter')
const journalElectricRouter = require('./RoutesForElectric/journalElectricRouter')
const scheduleElectricRouter = require('./RoutesForElectric/scheduleElectricRouter')
const resultElectricRouter = require('./RoutesForElectric/resultElectricRouter')

// School роуты
const classSchollRouter = require('./RoutesForScholl/classSchollRouter')
const lessonSchollRouter = require('./RoutesForScholl/lessonSchollRouter')
const careerSchollRouter = require('./RoutesForScholl/careerSchollRouter')
const journalSchollRouter = require('./RoutesForScholl/journalSchollRouter')
const scheduleSchollRouter = require('./RoutesForScholl/scheduleSchollRouter')
const olympiadSchollRouter = require('./RoutesForScholl/olympiadSchollRouter')
const resultSchollRouter = require('./RoutesForScholl/resultSchollRouter')
const electiveSchollRouter = require('./RoutesForScholl/electiveSchollRouter')

// IoT роуты (исправлены опечатки)
const applicationIoTRouter = require('./RoutesForIoT/applicationIoTRouter')
const groupIoTRouter = require('./RoutesForIoT/groupIoTRouter')
const journalIoTRouter = require('./RoutesForIoT/journalIoTRouter')
const lectureIoTRouter = require('./RoutesForIoT/lectureIoTRouter')
const programIoTRouter = require('./RoutesForIoT/programIoTRouter')
const projectIoTRouter = require('./RoutesForIoT/projectIoTRouter')
const scheduleIoTRouter = require('./RoutesForIoT/scheduleIoTRouter')


// Импорт роутеров
const sectionRouter = require('../routes/sectionRouter');
const topicRouter = require('../routes/topicRouter');
const postRouter = require('../routes/postRouter');
// Основные маршруты
router.use('/forum/sections', sectionRouter);
router.use('/forum/topics', topicRouter);
router.use('/forum/posts', postRouter);
// Основные маршруты
router.use('/user', userRouter)
router.use('/material', materialRouter)

// Electric маршруты
router.use('/hackathonElectric', hackathonElectricRouter)
router.use('/classesElectric', classesElectricRouter)
router.use('/groupElectric', groupElectricRouter)
router.use('/journalElectric', journalElectricRouter)
router.use('/scheduleElectric', scheduleElectricRouter)
router.use('/resultElectric', resultElectricRouter)

// School маршруты
router.use('/classScholl', classSchollRouter)
router.use('/lessonScholl', lessonSchollRouter)
router.use('/careerScholl', careerSchollRouter)
router.use('/journalScholl', journalSchollRouter)
router.use('/scheduleScholl', scheduleSchollRouter)
router.use('/olympiadScholl', olympiadSchollRouter)
router.use('/resultScholl', resultSchollRouter)
router.use('/electiveScholl', electiveSchollRouter)

// IoT маршруты (исправленные)
router.use('/applicationIot', applicationIoTRouter)
router.use('/groupIot', groupIoTRouter)
router.use('/journalIot', journalIoTRouter)
router.use('/lectureIot', lectureIoTRouter)
router.use('/programIot', programIoTRouter)
router.use('/projectIot', projectIoTRouter)
router.use('/scheduleIot', scheduleIoTRouter)

module.exports = router