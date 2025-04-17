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

const ForumSection = sequelize.define('ForumSection', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  type: { 
    type: DataTypes.ENUM('iot', 'electric', 'informatics'), 
    allowNull: false 
  },
  description: { type: DataTypes.TEXT }
}, { timestamps: false });

const ForumTopic = sequelize.define('ForumTopic', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  views: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: true });

const ForumPost = sequelize.define('ForumPost', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.TEXT, allowNull: false }
}, { timestamps: true });

const MaterialsLibrary = sequelize.define('MaterialsLibrary', {
  id_material: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  topic_materials: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT, allowNull: true },
  file_url: { type: DataTypes.STRING, allowNull: true },
  upload_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Базовые модели для групп и участников
const createGroupModel = (name) => {
  return sequelize.define(`${name}Group`, {
    id_group: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.STRING, defaultValue: 'active' },
    max_members: { type: DataTypes.INTEGER, allowNull: true },
  });
};

const createGroupMemberModel = (name) => {
  return sequelize.define(`${name}GroupMember`, {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, defaultValue: 'member' },
    joined_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.STRING, defaultValue: 'active' },
  });
};

// Модели для Electric
const ElectricGroup = createGroupModel('Electric');
const ElectricGroupMember = createGroupMemberModel('Electric');

const ClassesElectric = sequelize.define('ClassesElectric', {
  id_classes: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  id_materials: { type: DataTypes.INTEGER },
  description: { type: DataTypes.STRING },
  time: { type: DataTypes.STRING },
  date: { type: DataTypes.STRING }
});

const JournalElectric = sequelize.define('JournalElectric', {
  id_journal: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
  date: { type: DataTypes.DATE },
  time: { type: DataTypes.TIME, allowNull: true },
});

const ProjectElectric = sequelize.define('ProjectElectric', {
  id_project: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  deadlines: { type: DataTypes.DATE },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.STRING, defaultValue: 'in_progress' },
});

// Модели для IoT
const IoTGroup = createGroupModel('IoT');
const IoTGroupMember = createGroupMemberModel('IoT');

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

const UserRatingIoT = sequelize.define('UserRatingIoT', {
  id_rating: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  score: { type: DataTypes.FLOAT },
  period: { type: DataTypes.STRING },
  id_user: { type: DataTypes.INTEGER }
});

const IoTJournal = sequelize.define('IoTJournal', {
  id_journal: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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

// Модели для Informatics
const InformaticsGroup = createGroupModel('Informatics');
const InformaticsGroupMember = createGroupMemberModel('Informatics');

const ClassInformatics = sequelize.define('ClassInformatics', {
  id_class: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name_class: { type: DataTypes.STRING },
});

const LessonInformatics = sequelize.define('LessonInformatics', {
  id_lesson: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  topic_lesson: { type: DataTypes.STRING },
  id_materials: { type: DataTypes.INTEGER },
});

const CareerGuidanceInformatics = sequelize.define('CareerGuidanceInformatics', {
  id_guidance: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date_career_guidance: { type: DataTypes.DATE },
  topic_career_guidance: { type: DataTypes.STRING },
  consultants: { type: DataTypes.STRING },
});

const JournalInformatics = sequelize.define('JournalInformatics', {
  id_journal: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  grades: { type: DataTypes.JSONB },
  id_lesson: { type: DataTypes.INTEGER },
  change_date: { type: DataTypes.DATE },
  id_user: { type: DataTypes.INTEGER }
});

const ScheduleInformatics = sequelize.define('ScheduleInformatics', {
  id_schedule: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_lesson: { type: DataTypes.INTEGER },
  date: { type: DataTypes.DATE },
});

const OlympiadInformatics = sequelize.define('OlympiadInformatics', {
  id_olympiads: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  topic_olympiads: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  id_user: { type: DataTypes.INTEGER }
});

const OlympiadResultsInformatics = sequelize.define('OlympiadResultsInformatics', {
  id_result: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_olympiads: { type: DataTypes.INTEGER },
  team_name: { type: DataTypes.STRING },
  score: { type: DataTypes.FLOAT },
  position: { type: DataTypes.INTEGER }
});

const ElectiveInformatics = sequelize.define('ElectiveInformatics', {
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

// Связи для Electric
User.belongsToMany(ElectricGroup, { through: ElectricGroupMember, foreignKey: 'id_user' });
ElectricGroup.belongsToMany(User, { through: ElectricGroupMember, foreignKey: 'id_group' });

ElectricGroupMember.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(ElectricGroupMember, { foreignKey: 'id_user' });

ElectricGroup.hasMany(ClassesElectric, { foreignKey: 'id_group' });
ClassesElectric.belongsTo(ElectricGroup, { foreignKey: 'id_group' });

ElectricGroup.hasMany(JournalElectric, { foreignKey: 'id_group' });
JournalElectric.belongsTo(ElectricGroup, { foreignKey: 'id_group' });

ElectricGroup.hasMany(ProjectElectric, { foreignKey: 'id_group' });
ProjectElectric.belongsTo(ElectricGroup, { foreignKey: 'id_group' });

ElectricGroup.hasMany(ScheduleElectric, { foreignKey: 'id_group' });
ScheduleElectric.belongsTo(ElectricGroup, { foreignKey: 'id_group' });

ClassesElectric.hasMany(JournalElectric, { foreignKey: 'id_classes' });
JournalElectric.belongsTo(ClassesElectric, { foreignKey: 'id_classes' });

User.hasMany(ProjectElectric, { foreignKey: 'creator_id' });
ProjectElectric.belongsTo(User, { foreignKey: 'creator_id' });

// Связи для IoT
User.belongsToMany(IoTGroup, { through: IoTGroupMember, foreignKey: 'id_user' });
IoTGroup.belongsToMany(User, { through: IoTGroupMember, foreignKey: 'id_group' });

IoTGroupMember.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(IoTGroupMember, { foreignKey: 'id_user' });

IoTGroup.hasMany(LectureIoT, { foreignKey: 'id_group' });
LectureIoT.belongsTo(IoTGroup, { foreignKey: 'id_group' });

IoTGroup.hasMany(IoTJournal, { foreignKey: 'id_group' });
IoTJournal.belongsTo(IoTGroup, { foreignKey: 'id_group' });

IoTGroup.hasMany(ProjectIoT, { foreignKey: 'id_group' });
ProjectIoT.belongsTo(IoTGroup, { foreignKey: 'id_group' });

IoTGroup.hasMany(ScheduleIoT, { foreignKey: 'id_group' });
ScheduleIoT.belongsTo(IoTGroup, { foreignKey: 'id_group' });

// Связи для Informatics
User.belongsToMany(InformaticsGroup, { through: InformaticsGroupMember, foreignKey: 'id_user' });
InformaticsGroup.belongsToMany(User, { through: InformaticsGroupMember, foreignKey: 'id_group' });

InformaticsGroupMember.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(InformaticsGroupMember, { foreignKey: 'id_user' });

InformaticsGroup.hasMany(LessonInformatics, { foreignKey: 'id_group' });
LessonInformatics.belongsTo(InformaticsGroup, { foreignKey: 'id_group' });

InformaticsGroup.hasMany(JournalInformatics, { foreignKey: 'id_group' });
JournalInformatics.belongsTo(InformaticsGroup, { foreignKey: 'id_group' });

InformaticsGroup.hasMany(ScheduleInformatics, { foreignKey: 'id_group' });
ScheduleInformatics.belongsTo(InformaticsGroup, { foreignKey: 'id_group' });

// Связи для форума
User.hasMany(ForumTopic, { foreignKey: 'userId' });
ForumTopic.belongsTo(User, { foreignKey: 'userId' });

ForumSection.hasMany(ForumTopic, { foreignKey: 'sectionId' });
ForumTopic.belongsTo(ForumSection, { foreignKey: 'sectionId' });

ForumTopic.hasMany(ForumPost, { foreignKey: 'topicId' });
ForumPost.belongsTo(ForumTopic, { foreignKey: 'topicId' });

User.hasMany(ForumPost, { foreignKey: 'userId' });
ForumPost.belongsTo(User, { foreignKey: 'userId' });

// Связи для материалов
MaterialsLibrary.hasMany(ClassesElectric, { foreignKey: 'id_materials' });
ClassesElectric.belongsTo(MaterialsLibrary, { foreignKey: 'id_materials' });

MaterialsLibrary.hasMany(LessonInformatics, { foreignKey: 'id_materials' });
LessonInformatics.belongsTo(MaterialsLibrary, { foreignKey: 'id_materials' });

// Экспорт всех моделей
module.exports = {
  User,
  MaterialsLibrary,
  ForumSection,
  ForumTopic,
  ForumPost,
  // Electric
  ElectricGroup,
  ElectricGroupMember,
  ClassesElectric,
  JournalElectric,
  HackathonElectric,
  HackathonResultsElectric,
  ScheduleElectric,
  ProjectElectric,
  // IoT
  IoTGroup,
  IoTGroupMember,
  InternshipApplicationIoT,
  InternshipProgramIoT,
  UserRatingIoT,
  IoTJournal,
  ProjectIoT,
  LectureIoT,
  ScheduleIoT,
  // Informatics
  InformaticsGroup,
  InformaticsGroupMember,
  ClassInformatics,
  LessonInformatics,
  CareerGuidanceInformatics,
  JournalInformatics,
  ScheduleInformatics,
  OlympiadInformatics,
  OlympiadResultsInformatics,
  ElectiveInformatics,
  // Auth
  RefreshToken
};