const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {
  id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'USER' }, // Роль пользователя (например, admin, user)
  permissions: { type: DataTypes.STRING, allowNull: false }, // Права доступа
  avatar: { type: DataTypes.STRING, allowNull: true }, // Ссылка на аватар
  phone: { type: DataTypes.STRING, allowNull: true }, // Номер телефона
  birthdate: { type: DataTypes.DATEONLY, allowNull: true }, // Дата рождения
  location: { type: DataTypes.STRING, allowNull: true }, // Местоположение (например, город и страна)
  bio: { type: DataTypes.TEXT, allowNull: true }, // Биография или описание профиля
  status: { type: DataTypes.STRING, defaultValue: 'active' }, // Статус учетной записи
  website: { type: DataTypes.STRING, allowNull: true }, // Личная ссылка на вебсайт или портфолио
  linkedin: { type: DataTypes.STRING, allowNull: true }, // Ссылка на LinkedIn
  telegram: { type: DataTypes.STRING, allowNull: true }, // Telegram handle
  last_login: { type: DataTypes.DATE, allowNull: true }, // Последнее время входа
  joined_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }, // Дата регистрации
});

const MaterialsLibrary = sequelize.define('MaterialsLibrary', {
  id_material: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  topic_materials: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING},
  description: { type: DataTypes.TEXT, allowNull: true },
  file_url: { type: DataTypes.STRING, allowNull: true },
  upload_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const Forum = sequelize.define('Forum', {
  id_forum: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rules: { type: DataTypes.STRING },
  section: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

///////////////////// Electic

const ForumSectionElectric = sequelize.define('ForumSectionElectric', {
  id_section: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: {type: DataTypes.STRING},
  subsections: { type: DataTypes.STRING },
  topic_subsections: { type: DataTypes.STRING },
  moderators: { type: DataTypes.STRING },
  id_user: { type: DataTypes.INTEGER },
  creation_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const GroupElectric = sequelize.define('GroupElectric', {
  id_group: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_user: { type: DataTypes.INTEGER },
  name_group: { type: DataTypes.STRING },
  list_user: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  description: { type: DataTypes.TEXT, allowNull: true },
});

const ClassesElectric = sequelize.define('ClassesElectric', {
  id_classes: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_group: { type: DataTypes.INTEGER },
  title: { type: DataTypes.STRING },
  id_materials: { type: DataTypes.INTEGER },
  description: {type: DataTypes.STRING},
  time: {type: DataTypes.STRING},
  date: {type: DataTypes.STRING}
});

const JournalElectric = sequelize.define('JournalElectric', {
  id_journal: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_group: { type: DataTypes.INTEGER },
  grades: { type: DataTypes.STRING },
  id_classes: { type: DataTypes.INTEGER },
  change_date: { type: DataTypes.DATE },
  academic_performance: { type: DataTypes.STRING }
});

const HackathonElectric = sequelize.define('HackathonElectric', {
  id_hackathon: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  topic: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  organizers: { type: DataTypes.STRING },
  id_user: { type: DataTypes.INTEGER }
});

const HackathonResultsElectric = sequelize.define('HackathonResultsElectric', {
  id_result: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_hackathon: { type: DataTypes.INTEGER },
  team_name: { type: DataTypes.STRING },
  project_name: { type: DataTypes.STRING },
  score: { type: DataTypes.FLOAT },
  position: { type: DataTypes.INTEGER }
});

const ScheduleElectric = sequelize.define('ScheduleElectric', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_classes: { type: DataTypes.INTEGER },
  id_group: { type: DataTypes.INTEGER },
  date: { type: DataTypes.DATE },
  time: { type: DataTypes.TIME, allowNull: true },
});

const ProjectElectric = sequelize.define('ProjectElectric', {
  id_project: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_user: { type: DataTypes.INTEGER },
  deadlines: { type: DataTypes.DATE },
  name: { type: DataTypes.STRING },
  id_emulator: { type: DataTypes.INTEGER },
  description: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.STRING, defaultValue: 'in_progress' },
});

/////////////////////////

//////////////////////// IoT

const InternshipApplicationIoT = sequelize.define('InternshipApplicationIoT', {
  application_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  contacts: { type: DataTypes.STRING },
  application_date: { type: DataTypes.DATE },
  application_status: { type: DataTypes.STRING },
  resume_link: { type: DataTypes.STRING }
});

const InternshipProgramIoT = sequelize.define('InternshipProgramIoT', {
  program_name: { type: DataTypes.STRING },
  program_description: { type: DataTypes.STRING },
  program_duration: { type: DataTypes.STRING },
  start_date_application: { type: DataTypes.DATE },
  end_date_application: { type: DataTypes.DATE },
  program_capacity: { type: DataTypes.INTEGER },
  requirements: { type: DataTypes.STRING },
  specialization: { type: DataTypes.STRING }
});

const ForumSectionIoT = sequelize.define('ForumSectionIoT', {
  subsections: { type: DataTypes.STRING },
  posts: { type: DataTypes.STRING },
  moderators: { type: DataTypes.STRING }
});

const UserRatingIoT = sequelize.define('UserRatingIoT', {
  score: { type: DataTypes.FLOAT },
  period: { type: DataTypes.STRING }
});

const IoTJournal = sequelize.define('IoTJournal', {
  id_group: { type: DataTypes.INTEGER },
  grades: { type: DataTypes.STRING },
  id_classes: { type: DataTypes.INTEGER },
  change_date: { type: DataTypes.DATE },
  academic_performance: { type: DataTypes.STRING }
});

const ProjectIoT = sequelize.define('ProjectIoT', {
  project_name: { type: DataTypes.STRING },
  team_members: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING }
});

const LectureIoT = sequelize.define('LectureIoT', {
  lecture_title: { type: DataTypes.STRING },
  slides: { type: DataTypes.STRING },
  duration: { type: DataTypes.STRING }
});

const ScheduleIoT = sequelize.define('ScheduleIoT', {
  date: { type: DataTypes.DATE }
});

//////////////////////////

///////////////////////// Scholl

const ClassScholl = sequelize.define('ClassScholl', {
  id_class: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_user: { type: DataTypes.INTEGER, allowNull: false },
  name_class: { type: DataTypes.STRING },
  list_user: { type: DataTypes.STRING },
});

const LessonScholl = sequelize.define('LessonScholl', {
  id_lesson: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  id_class: { type: DataTypes.INTEGER, allowNull: false },
  topic_lesson: { type: DataTypes.STRING },
  id_materials: { type: DataTypes.INTEGER },
});

const CareerGuidanceScholl = sequelize.define('CareerGuidanceScholl', {
  date_career_guidance: { type: DataTypes.DATE },
  topic_career_guidance: { type: DataTypes.STRING },
  consultants: { type: DataTypes.STRING },
  id_class: { type: DataTypes.INTEGER, allowNull: false },
});

const ForumSectionScholl = sequelize.define('ForumSectionScholl', {
  subsections: { type: DataTypes.STRING },
  topic_subsections: { type: DataTypes.STRING },
  moderators: { type: DataTypes.STRING },
  id_user: { type: DataTypes.INTEGER },
  name: { type: DataTypes.STRING },
});

const JournalScholl = sequelize.define('JournalScholl', {
  id_class: { type: DataTypes.INTEGER },
  grades: { type: DataTypes.JSONB },
  id_lesson: { type: DataTypes.INTEGER },
  change_date: { type: DataTypes.DATE },
});

const ScheduleScholl = sequelize.define('ScheduleScholl', {
  id_lesson: { type: DataTypes.INTEGER },
  id_class: { type: DataTypes.INTEGER },
  id_elective: { type: DataTypes.INTEGER },
  date: { type: DataTypes.DATE },
});

const OlympiadScholl = sequelize.define('OlympiadScholl', {
  id_user: { type: DataTypes.INTEGER },
  name: { type: DataTypes.STRING },
  id_olympiads: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  topic_olympiads: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
});

const OlympiadResultsScholl = sequelize.define('OlympiadResultsScholl', {
  id_result: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_olympiads: { type: DataTypes.INTEGER },
  team_name: { type: DataTypes.STRING },
  score: { type: DataTypes.FLOAT },
  position: { type: DataTypes.INTEGER },
});

const ElectiveScholl = sequelize.define('ElectiveScholl', {
  id_user: { type: DataTypes.INTEGER },
  name: { type: DataTypes.STRING },
  topic_elective: { type: DataTypes.STRING },
});

////////////////////////

//////////////////////// Electric

User.hasMany(GroupElectric, { foreignKey: 'id_user' });
User.hasMany(ProjectElectric, { foreignKey: 'id_user' });
User.hasMany(HackathonElectric, { foreignKey: 'id_user' });

HackathonElectric.hasMany(HackathonResultsElectric, { foreignKey: 'id_hackathon' });
HackathonResultsElectric.belongsTo(HackathonElectric, { foreignKey: 'id_hackathon' });

GroupElectric.hasMany(ClassesElectric, { foreignKey: 'id_group' });
ClassesElectric.belongsTo(GroupElectric, { foreignKey: 'id_group' });

ClassesElectric.hasMany(ScheduleElectric, { foreignKey: 'id_classes' });
ScheduleElectric.belongsTo(ClassesElectric, { foreignKey: 'id_classes' });

ProjectElectric.belongsTo(EmulatorElectric, { foreignKey: 'id_emulator' });
EmulatorElectric.hasMany(ProjectElectric, { foreignKey: 'id_emulator' });

EmulatorElectric.hasMany(EmulatorLogElectric, { foreignKey: 'id_emulator' });
EmulatorLogElectric.belongsTo(EmulatorElectric, { foreignKey: 'id_emulator' });

EmulatorElectric.hasMany(EmulatorConfigurationElectric, { foreignKey: 'id_emulator' });
EmulatorConfigurationElectric.belongsTo(EmulatorElectric, { foreignKey: 'id_emulator' });

MaterialsLibrary.hasMany(ClassesElectric, { foreignKey: 'id_material' });
ClassesElectric.belongsTo(MaterialsLibrary, { foreignKey: 'id_material' });

Forum.hasMany(ForumSectionElectric, { foreignKey: 'id_forum' });
ForumSectionElectric.belongsTo(Forum, { foreignKey: 'id_forum' });

///////////////////////

////////////////////// IoT

User.hasMany(InternshipApplicationIoT, { foreignKey: 'id_user' });
InternshipApplicationIoT.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(ForumSectionIoT, { foreignKey: 'id_user' });
ForumSectionIoT.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(UserRatingIoT, { foreignKey: 'id_user' });
UserRatingIoT.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(IoTJournal, { foreignKey: 'id_user' });
IoTJournal.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(ProjectIoT, { foreignKey: 'id_user' });
ProjectIoT.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(LectureIoT, { foreignKey: 'id_user' });
LectureIoT.belongsTo(User, { foreignKey: 'id_user' });

LectureIoT.hasMany(ScheduleIoT, { foreignKey: 'id_classes' });
ScheduleIoT.belongsTo(LectureIoT, { foreignKey: 'id_classes' });

IoTJournal.hasMany(ScheduleIoT, { foreignKey: 'id_classes' });
ScheduleIoT.belongsTo(IoTJournal, { foreignKey: 'id_classes' });

/////////////////////

//////////////////// Scholl

User.hasMany(ClassScholl, { foreignKey: 'id_user' });
ClassScholl.belongsTo(User, { foreignKey: 'id_user' });

LessonScholl.belongsTo(ClassScholl, { foreignKey: 'id_class' });
ClassScholl.hasMany(LessonScholl, { foreignKey: 'id_class' });

LessonScholl.belongsTo(MaterialsLibrary, { foreignKey: 'id_materials' });
MaterialsLibrary.hasMany(LessonScholl, { foreignKey: 'id_materials' });

CareerGuidanceScholl.belongsTo(ClassScholl, { foreignKey: 'id_class' });
ClassScholl.hasMany(CareerGuidanceScholl, { foreignKey: 'id_class' });

Forum.hasMany(ForumSectionScholl, { foreignKey: 'id_forum' });
ForumSectionScholl.belongsTo(Forum, { foreignKey: 'id_forum' });

ScheduleScholl.belongsTo(ClassScholl, { foreignKey: 'id_class' });
ClassScholl.hasMany(ScheduleScholl, { foreignKey: 'id_class' });

OlympiadScholl.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(OlympiadScholl, { foreignKey: 'id_user' });

OlympiadResultsScholl.belongsTo(OlympiadScholl, { foreignKey: 'id_olympiads' });
OlympiadScholl.hasMany(OlympiadResultsScholl, { foreignKey: 'id_olympiads' });

ElectiveScholl.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(ElectiveScholl, { foreignKey: 'id_user' });

JournalScholl.belongsTo(ClassScholl, { foreignKey: 'id_class' });
JournalScholl.belongsTo(LessonScholl, { foreignKey: 'id_lesson' });

//////////////////

module.exports = {
  User,
  MaterialsLibrary,
  Forum,
  ////////////// Electric
  ForumSectionElectric,
  GroupElectric,
  ClassesElectric,
  JournalElectric,
  HackathonElectric,
  HackathonResultsElectric,
  ScheduleElectric,
  ProjectElectric,
  EmulatorElectric,
  EmulatorLogElectric,
  EmulatorConfigurationElectric,
  //////////// IoT
  InternshipApplicationIoT,
  InternshipProgramIoT,
  ForumSectionIoT,
  UserRatingIoT,
  IoTJournal,
  ProjectIoT,
  LectureIoT,
  ScheduleIoT,
  //////////// Scholl
  ClassScholl,
  LessonScholl,
  CareerGuidanceScholl,
  ForumSectionScholl,
  JournalScholl,
  ScheduleScholl,
  OlympiadScholl,
  OlympiadResultsScholl,
  ElectiveScholl,
};
