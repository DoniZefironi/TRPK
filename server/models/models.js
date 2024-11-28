const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: false},
    permissions: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    roles: {type: DataTypes.STRING, defaultValue: "USER"},
})

const MaterialsLibrary = sequelize.define('materialsLibrary', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    topic_materials: {type: DataTypes.STRING, allowNull: false},
})

const Forum = sequelize.define('forum', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rules: {type: DataTypes.STRING, allowNull: false},
})

// Объекты электроники
const ElectronicsProject = sequelize.define('electronicsProject', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    deadlines: {type: DataTypes.DATE, allowNull: false}, 
    name: {type: DataTypes.STRING, allowNull: false},
})

const TasksProject = sequelize.define('tasksProject', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false},
    deadline: {type: DataTypes.DATE, allowNull: false}, 
})

const EmulatorElectronics = sequelize.define('emulatorElectronics', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    device_type: {type: DataTypes.STRING, allowNull: false},
    functionality: {type: DataTypes.STRING, allowNull: false},
})

const EmulatorLog = sequelize.define('emulatorLog', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    timestamp: {type: DataTypes.DATE, allowNull: false}, 
    action: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false},
})

const EmulatorConfiguration = sequelize.define('emulatorConfiguration', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    settings: {type: DataTypes.TEXT, allowNull: false}, 
})

const ElectronicsMagazine = sequelize.define('electronicsMagazine', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    grades: {type: DataTypes.FLOAT, allowNull: false}, 
    change_date: {type: DataTypes.DATE, allowNull: false}, 
    academic_performance: {type: DataTypes.FLOAT, allowNull: false}, 
})

const ElectronicsGroup = sequelize.define('electronicsGroup', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

const ElectronicsClasses = sequelize.define('electronicsClasses', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    topic_classes: {type: DataTypes.STRING, allowNull: false},
})

const Hackathon = sequelize.define('hackathon', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    topic: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false}, 
    organizers: {type: DataTypes.STRING, allowNull: false},
})

const HackathonResults = sequelize.define('hackathonResults', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    team_name: {type: DataTypes.STRING, allowNull: false},
    score: {type: DataTypes.FLOAT, allowNull: false}, 
    position: {type: DataTypes.STRING, allowNull: false},
})

const ElectronicsSchedule = sequelize.define('electronicsSchedule', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE, allowNull: false}, 
})

const Electronicsforumsection = sequelize.define('electronicsforumsection', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    subsections: {type: DataTypes.STRING, allowNull: false},
    posts: {type: DataTypes.TEXT, allowNull: false}, 
    moderators: {type: DataTypes.STRING, allowNull: false},
})

// Объекты по школе
const CareerGuidance = sequelize.define('careerGuidance', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE, allowNull: false}, 
    topic: {type: DataTypes.STRING, allowNull: false},
    consultans: {type: DataTypes.STRING, allowNull: false},
})

const Class = sequelize.define('class', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

const JournalComputerScience = sequelize.define('journalComputerScience', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE, allowNull: false}, 
    grades: {type: DataTypes.FLOAT, allowNull: false}, 
})

const ComputerScienceSchedule = sequelize.define('computerScienceSchedule', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE, allowNull: false}, 
})

const Electives = sequelize.define('electives', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    topic_elective: {type: DataTypes.STRING, allowNull: false},
})

const ComputerScienceLessons = sequelize.define('computerScienceLessons', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    topic_lesson: {type: DataTypes.STRING, allowNull: false},
})

const Olympics = sequelize.define('olympics', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    topic_olympiads: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false}, 
})

const Olympiadresults = sequelize.define('olympiadresults', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    team_name: {type: DataTypes.STRING, allowNull: false},
    score: {type: DataTypes.FLOAT, allowNull: false}, 
    position: {type: DataTypes.STRING, allowNull: false},
})

const ComputerScienceforumsection = sequelize.define('computerScienceforumsection', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    subsections: {type: DataTypes.STRING, allowNull: false},
    posts: {type: DataTypes.TEXT, allowNull: false}, 
    moderators: {type: DataTypes.STRING, allowNull: false},
})

// Объекты IoT
const IoTCourseMagazine = sequelize.define('ioTCourseMagazine', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    grades: {type: DataTypes.FLOAT, allowNull: false}, 
    date: {type: DataTypes.DATE, allowNull: false}, 
    academic_performance: {type: DataTypes.FLOAT, allowNull: false}, 
})

const IoTSchedule = sequelize.define('ioTSchedule', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE, allowNull: false}, 
})

const Userrating = sequelize.define('userrating', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    score: {type: DataTypes.FLOAT, allowNull: false}, 
    period: {type : DataTypes.STRING, allowNull: false},
})

const IoTforumsection = sequelize.define('ioTforumsection', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    subsections: {type: DataTypes.STRING, allowNull: false},
    posts: {type: DataTypes.TEXT, allowNull: false}, 
    moderators: {type: DataTypes.STRING, allowNull: false},
})

const internshipprogram = sequelize.define('internshipprogram', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false}, 
    duration: {type: DataTypes.STRING, allowNull: false},
    start_date_application: {type: DataTypes.DATE, allowNull: false}, 
    end_date_application: {type: DataTypes.DATE, allowNull: false}, 
    capacity: {type: DataTypes.INTEGER, allowNull: false}, 
    requirements: {type: DataTypes.STRING, allowNull: false},
    specialization: {type: DataTypes.STRING, allowNull: false},
})

const Applicationsforinternships = sequelize.define('applicationsforinternships', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    contacts: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false}, 
    status: {type: DataTypes.STRING, allowNull: false},
    resume_link: {type: DataTypes.STRING, allowNull: false},
})

const IoTProjects = sequelize.define('ioTProjects', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    team_members: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false}, 
})

const IoTclasses = sequelize.define('ioTclasses', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    lecture_title: {type: DataTypes.STRING, allowNull: false},
    slides: {type: DataTypes.TEXT, allowNull: false}, 
    duration: {type: DataTypes.INTEGER, allowNull: false}, 
})



Syllabus.hasMany(Subject)
Subject.belongsTo(Syllabus)

Subject.hasOne(Methodological_rec)
Methodological_rec.belongsTo(Subject)

Methodological_rec.belongsToMany(User, {through: User_methodological})
User.belongsToMany(Methodological_rec, {through: User_methodological})

Methodological_rec.belongsToMany(Speciality, {through: Speciality_method})
Speciality.belongsToMany(Methodological_rec, {through: Speciality_method})

module.exports = {

}