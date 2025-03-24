const { Router } = require('express') // Правильный импорт
const router = Router() // ✅ Правильное создание роутера

// Основные роуты
const userRouter = require('./userRouter')
const forumRouter = require('./forumRouter')
const materialRouter = require('./materialRouter')

// Electric роуты
const hackathonElectricRouter = require('./RoutesForElectric/hackathonElectricRouter')
const classesElectricRouter = require('./RoutesForElectric/classesElectricRouter')
const groupElectricRouter = require('./RoutesForElectric/groupElectricRouter')
const forumSectionElectricRouter = require('./RoutesForElectric/forumSectionElectricRouter')
const journalElectricRouter = require('./RoutesForElectric/journalElectricRouter')
const scheduleElectricRouter = require('./RoutesForElectric/scheduleElectricRouter')
const resultElectricRouter = require('./RoutesForElectric/resultElectricRouter')

// School роуты
const classSchollRouter = require('./RoutesForScholl/classSchollRouter')
const lessonSchollRouter = require('./RoutesForScholl/lessonSchollRouter')
const careerSchollRouter = require('./RoutesForScholl/careerSchollRouter')
const forumSectionSchollRouter = require('./RoutesForScholl/forumSectionSchollRouter')
const journalSchollRouter = require('./RoutesForScholl/journalSchollRouter')
const scheduleSchollRouter = require('./RoutesForScholl/scheduleSchollRouter')
const olympiadSchollRouter = require('./RoutesForScholl/olympiadSchollRouter')
const resultSchollRouter = require('./RoutesForScholl/resultSchollRouter')
const electiveSchollRouter = require('./RoutesForScholl/electiveSchollRouter')

// IoT роуты (исправлены опечатки)
const applicationIoTRouter = require('./RoutesForIoT/applicationIoTRouter')
const forumSectionIoTRouter = require('./RoutesForIoT/forumSectionIoTRouter')
const groupIoTRouter = require('./RoutesForIoT/groupIoTRouter')
const journalIoTRouter = require('./RoutesForIoT/journalIoTRouter')
const lectureIoTRouter = require('./RoutesForIoT/lectureIoTRouter')
const programIoTRouter = require('./RoutesForIoT/programIoTRouter')
const projectIoTRouter = require('./RoutesForIoT/projectIoTRouter')
const scheduleIoTRouter = require('./RoutesForIoT/scheduleIoTRouter')

// Основные маршруты
router.use('/user', userRouter)
router.use('/material', materialRouter)
router.use('/forum', forumRouter)

// Electric маршруты
router.use('/hackathonElectric', hackathonElectricRouter)
router.use('/classesElectric', classesElectricRouter)
router.use('/groupElectric', groupElectricRouter)
router.use('/forumSectionElectric', forumSectionElectricRouter)
router.use('/journalElectric', journalElectricRouter)
router.use('/scheduleElectric', scheduleElectricRouter)
router.use('/resultElectric', resultElectricRouter)

// School маршруты
router.use('/classScholl', classSchollRouter)
router.use('/lessonScholl', lessonSchollRouter)
router.use('/careerScholl', careerSchollRouter)
router.use('/forumSectionScholl', forumSectionSchollRouter)
router.use('/journalScholl', journalSchollRouter)
router.use('/scheduleScholl', scheduleSchollRouter)
router.use('/olympiadScholl', olympiadSchollRouter)
router.use('/resultScholl', resultSchollRouter)
router.use('/electiveScholl', electiveSchollRouter)

// IoT маршруты (исправленные)
router.use('/applicationIot', applicationIoTRouter)
router.use('/forumSectionIot', forumSectionIoTRouter)
router.use('/groupIot', groupIoTRouter)
router.use('/journalIot', journalIoTRouter)
router.use('/lectureIot', lectureIoTRouter)
router.use('/programIot', programIoTRouter)
router.use('/projectIot', projectIoTRouter)
router.use('/scheduleIot', scheduleIoTRouter)

module.exports = router