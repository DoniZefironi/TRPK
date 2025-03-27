const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const allowedCourses = ['electronics', 'informatics', 'IoT'];

// Основные модели
const User = sequelize.define('User', {
  id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
  permissions: {
    type: DataTypes.ENUM, 
    values: allowedCourses,
    allowNull: false,
    validate: {
      isIn: {
        args: [allowedCourses],
        msg: `Permissions должны быть одним из: ${allowedCourses.join(', ')}`
      }
    }
  },
  avatar: { type: DataTypes.STRING, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true },
  birthdate: { type: DataTypes.DATEONLY, allowNull: true },
  location: { type: DataTypes.STRING, allowNull: true },
  bio: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.STRING, defaultValue: 'active' },
  website: { type: DataTypes.STRING, allowNull: true },
  linkedin: { type: DataTypes.STRING, allowNull: true },
  telegram: { type: DataTypes.STRING, allowNull: true },
  last_login: { type: DataTypes.DATE, allowNull: true },
  joined_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const MaterialsLibrary = sequelize.define('MaterialsLibrary', {
  id_material: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  topic_materials: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
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

const ForumTopic = sequelize.define('ForumTopic', {
  id_topic: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  id_section: { type: DataTypes.INTEGER, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  id_user: { type: DataTypes.INTEGER },
});

const ForumPost = sequelize.define('ForumPost', {
  id_post: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  id_topic: { type: DataTypes.INTEGER, allowNull: false },
  id_user: { type: DataTypes.INTEGER },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Модели для Electric
const ForumSectionElectric = sequelize.define('ForumSectionElectric', {
  id_section: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
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
  description: { type: DataTypes.STRING },
  time: { type: DataTypes.STRING },
  date: { type: DataTypes.STRING }
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
  description: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.STRING, defaultValue: 'in_progress' },
});

// Модели для IoT
const InternshipApplicationIoT = sequelize.define('InternshipApplicationIoT', {
  application_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  contacts: { type: DataTypes.STRING },
  application_date: { type: DataTypes.DATE },
  application_status: { type: DataTypes.STRING },
  resume_link: { type: DataTypes.STRING },
  id_user: { type: DataTypes.INTEGER }
});

const InternshipProgramIoT = sequelize.define('InternshipProgramIoT', {
  program_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
  id_section: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  subsections: { type: DataTypes.STRING },
  posts: { type: DataTypes.STRING },
  moderators: { type: DataTypes.STRING },
  id_forum: { type: DataTypes.INTEGER },
  id_user: { type: DataTypes.INTEGER }
});

const UserRatingIoT = sequelize.define('UserRatingIoT', {
  id_rating: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  score: { type: DataTypes.FLOAT },
  period: { type: DataTypes.STRING },
  id_user: { type: DataTypes.INTEGER }
});

const IoTJournal = sequelize.define('IoTJournal', {
  id_journal: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_group: { type: DataTypes.INTEGER },
  grades: { type: DataTypes.STRING },
  id_classes: { type: DataTypes.INTEGER },
  change_date: { type: DataTypes.DATE },
  academic_performance: { type: DataTypes.STRING },
  id_user: { type: DataTypes.INTEGER }
});

const ProjectIoT = sequelize.define('ProjectIoT', {
  id_project: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  project_name: { type: DataTypes.STRING },
  team_members: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  id_user: { type: DataTypes.INTEGER }
});

const LectureIoT = sequelize.define('LectureIoT', {
  id_lecture: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  lecture_title: { type: DataTypes.STRING },
  slides: { type: DataTypes.STRING },
  duration: { type: DataTypes.STRING },
  id_user: { type: DataTypes.INTEGER }
});

const ScheduleIoT = sequelize.define('ScheduleIoT', {
  id_schedule: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATE },
  id_classes: { type: DataTypes.INTEGER }
});

// Модели для School
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
  id_guidance: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date_career_guidance: { type: DataTypes.DATE },
  topic_career_guidance: { type: DataTypes.STRING },
  consultants: { type: DataTypes.STRING },
  id_class: { type: DataTypes.INTEGER, allowNull: false },
});

const ForumSectionScholl = sequelize.define('ForumSectionScholl', {
  id_section: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  subsections: { type: DataTypes.STRING },
  topic_subsections: { type: DataTypes.STRING },
  moderators: { type: DataTypes.STRING },
  id_user: { type: DataTypes.INTEGER },
  name: { type: DataTypes.STRING },
  id_forum: { type: DataTypes.INTEGER }
});

const JournalScholl = sequelize.define('JournalScholl', {
  id_journal: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_class: { type: DataTypes.INTEGER },
  grades: { type: DataTypes.JSONB },
  id_lesson: { type: DataTypes.INTEGER },
  change_date: { type: DataTypes.DATE },
  id_user: { type: DataTypes.INTEGER }
});

const ScheduleScholl = sequelize.define('ScheduleScholl', {
  id_schedule: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_lesson: { type: DataTypes.INTEGER },
  id_class: { type: DataTypes.INTEGER },
  id_elective: { type: DataTypes.INTEGER },
  date: { type: DataTypes.DATE },
});

const OlympiadScholl = sequelize.define('OlympiadScholl', {
  id_olympiads: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  topic_olympiads: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  id_user: { type: DataTypes.INTEGER }
});

const OlympiadResultsScholl = sequelize.define('OlympiadResultsScholl', {
  id_result: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_olympiads: { type: DataTypes.INTEGER },
  team_name: { type: DataTypes.STRING },
  score: { type: DataTypes.FLOAT },
  position: { type: DataTypes.INTEGER }
});

const ElectiveScholl = sequelize.define('ElectiveScholl', {
  id_elective: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  topic_elective: { type: DataTypes.STRING },
  id_user: { type: DataTypes.INTEGER }
});

// Модель для токенов
const RefreshToken = sequelize.define('RefreshToken', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_user: { type: DataTypes.INTEGER, allowNull: false },
  refresh_token: { type: DataTypes.TEXT, allowNull: false },
});

// Установка связей между моделями

// Общие связи
User.hasMany(RefreshToken, { foreignKey: 'id_user' });
RefreshToken.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(ForumTopic, { foreignKey: 'id_user' });
ForumTopic.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(ForumPost, { foreignKey: 'id_user' });
ForumPost.belongsTo(User, { foreignKey: 'id_user' });

Forum.hasMany(ForumTopic, { foreignKey: 'id_forum' });
ForumTopic.belongsTo(Forum, { foreignKey: 'id_forum' });

ForumTopic.hasMany(ForumPost, { foreignKey: 'id_topic' });
ForumPost.belongsTo(ForumTopic, { foreignKey: 'id_topic' });

MaterialsLibrary.hasMany(LessonScholl, { foreignKey: 'id_materials' });
LessonScholl.belongsTo(MaterialsLibrary, { foreignKey: 'id_materials' });

// Связи для Electric
User.hasMany(GroupElectric, { foreignKey: 'id_user' });
GroupElectric.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(ProjectElectric, { foreignKey: 'id_user' });
ProjectElectric.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(HackathonElectric, { foreignKey: 'id_user' });
HackathonElectric.belongsTo(User, { foreignKey: 'id_user' });

HackathonElectric.hasMany(HackathonResultsElectric, { foreignKey: 'id_hackathon' });
HackathonResultsElectric.belongsTo(HackathonElectric, { foreignKey: 'id_hackathon' });

GroupElectric.hasMany(ClassesElectric, { foreignKey: 'id_group' });
ClassesElectric.belongsTo(GroupElectric, { foreignKey: 'id_group' });

ClassesElectric.hasMany(ScheduleElectric, { foreignKey: 'id_classes' });
ScheduleElectric.belongsTo(ClassesElectric, { foreignKey: 'id_classes' });

MaterialsLibrary.hasMany(ClassesElectric, { foreignKey: 'id_material' });
ClassesElectric.belongsTo(MaterialsLibrary, { foreignKey: 'id_material' });

Forum.hasMany(ForumSectionElectric, { foreignKey: 'id_forum' });
ForumSectionElectric.belongsTo(Forum, { foreignKey: 'id_forum' });

ForumSectionElectric.hasMany(ForumTopic, { 
  foreignKey: 'id_section',
  as: 'electricTopics'
});
ForumTopic.belongsTo(ForumSectionElectric, { 
  foreignKey: 'id_section',
  as: 'electricSection'
});

GroupElectric.hasMany(JournalElectric, { foreignKey: 'id_group' });
JournalElectric.belongsTo(GroupElectric, { foreignKey: 'id_group' });

ClassesElectric.hasMany(JournalElectric, { foreignKey: 'id_classes' });
JournalElectric.belongsTo(ClassesElectric, { foreignKey: 'id_classes' });

// Связи для IoT
User.hasMany(InternshipApplicationIoT, { foreignKey: 'id_user' });
InternshipApplicationIoT.belongsTo(User, { foreignKey: 'id_user' });

Forum.hasMany(ForumSectionIoT, { foreignKey: 'id_forum' });
ForumSectionIoT.belongsTo(Forum, { foreignKey: 'id_forum' });

User.hasMany(ForumSectionIoT, { foreignKey: 'id_user' });
ForumSectionIoT.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(UserRatingIoT, { foreignKey: 'id_user' });
UserRatingIoT.belongsTo(User, { foreignKey: 'id_user' });

GroupElectric.hasMany(IoTJournal, { foreignKey: 'id_group' });
IoTJournal.belongsTo(GroupElectric, { foreignKey: 'id_group' });

ClassesElectric.hasMany(IoTJournal, { foreignKey: 'id_classes' });
IoTJournal.belongsTo(ClassesElectric, { foreignKey: 'id_classes' });

User.hasMany(IoTJournal, { foreignKey: 'id_user' });
IoTJournal.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(ProjectIoT, { foreignKey: 'id_user' });
ProjectIoT.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(LectureIoT, { foreignKey: 'id_user' });
LectureIoT.belongsTo(User, { foreignKey: 'id_user' });

LectureIoT.hasMany(ScheduleIoT, { foreignKey: 'id_classes' });
ScheduleIoT.belongsTo(LectureIoT, { foreignKey: 'id_classes' });

ClassesElectric.hasMany(ScheduleIoT, { foreignKey: 'id_classes' });
ScheduleIoT.belongsTo(ClassesElectric, { foreignKey: 'id_classes' });

// Связи для School
User.hasMany(ClassScholl, { foreignKey: 'id_user' });
ClassScholl.belongsTo(User, { foreignKey: 'id_user' });

ClassScholl.hasMany(LessonScholl, { foreignKey: 'id_class' });
LessonScholl.belongsTo(ClassScholl, { foreignKey: 'id_class' });

ClassScholl.hasMany(CareerGuidanceScholl, { foreignKey: 'id_class' });
CareerGuidanceScholl.belongsTo(ClassScholl, { foreignKey: 'id_class' });

Forum.hasMany(ForumSectionScholl, { foreignKey: 'id_forum' });
ForumSectionScholl.belongsTo(Forum, { foreignKey: 'id_forum' });

ForumSectionScholl.hasMany(ForumTopic, { 
  foreignKey: 'id_section',
  as: 'schoolTopics'
});
ForumTopic.belongsTo(ForumSectionScholl, { 
  foreignKey: 'id_section',
  as: 'schoolSection'
});

ClassScholl.hasMany(ScheduleScholl, { foreignKey: 'id_class' });
ScheduleScholl.belongsTo(ClassScholl, { foreignKey: 'id_class' });

User.hasMany(OlympiadScholl, { foreignKey: 'id_user' });
OlympiadScholl.belongsTo(User, { foreignKey: 'id_user' });

OlympiadScholl.hasMany(OlympiadResultsScholl, { foreignKey: 'id_olympiads' });
OlympiadResultsScholl.belongsTo(OlympiadScholl, { foreignKey: 'id_olympiads' });

User.hasMany(ElectiveScholl, { foreignKey: 'id_user' });
ElectiveScholl.belongsTo(User, { foreignKey: 'id_user' });

ClassScholl.hasMany(JournalScholl, { foreignKey: 'id_class' });
JournalScholl.belongsTo(ClassScholl, { foreignKey: 'id_class' });

LessonScholl.hasMany(JournalScholl, { foreignKey: 'id_lesson' });
JournalScholl.belongsTo(LessonScholl, { foreignKey: 'id_lesson' });

User.hasMany(JournalScholl, { foreignKey: 'id_user' });
JournalScholl.belongsTo(User, { foreignKey: 'id_user' });

LessonScholl.hasMany(ScheduleScholl, { foreignKey: 'id_lesson' });
ScheduleScholl.belongsTo(LessonScholl, { foreignKey: 'id_lesson' });

ElectiveScholl.hasMany(ScheduleScholl, { foreignKey: 'id_elective' });
ScheduleScholl.belongsTo(ElectiveScholl, { foreignKey: 'id_elective' });

// Экспорт всех моделей
module.exports = {
  User,
  MaterialsLibrary,
  Forum,
  ForumTopic,
  ForumPost,
  // Electric
  ForumSectionElectric,
  GroupElectric,
  ClassesElectric,
  JournalElectric,
  HackathonElectric,
  HackathonResultsElectric,
  ScheduleElectric,
  ProjectElectric,
  // IoT
  InternshipApplicationIoT,
  InternshipProgramIoT,
  ForumSectionIoT,
  UserRatingIoT,
  IoTJournal,
  ProjectIoT,
  LectureIoT,
  ScheduleIoT,
  // School
  ClassScholl,
  LessonScholl,
  CareerGuidanceScholl,
  ForumSectionScholl,
  JournalScholl,
  ScheduleScholl,
  OlympiadScholl,
  OlympiadResultsScholl,
  ElectiveScholl,
  // Auth
  RefreshToken
};