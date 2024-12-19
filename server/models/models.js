const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {
  id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING },
  permissions: { type: DataTypes.STRING }
});

const InternshipApplication = sequelize.define('InternshipApplication', {
  application_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  contacts: { type: DataTypes.STRING },
  application_date: { type: DataTypes.DATE },
  application_status: { type: DataTypes.STRING },
  resume_link: { type: DataTypes.STRING }
});

const InternshipProgram = sequelize.define('InternshipProgram', {
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

const UserRating = sequelize.define('UserRating', {
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

// Relationships
User.hasMany(InternshipApplication, { foreignKey: 'id_user' });
InternshipApplication.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(ForumSectionIoT, { foreignKey: 'id_user' });
ForumSectionIoT.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(UserRating, { foreignKey: 'id_user' });
UserRating.belongsTo(User, { foreignKey: 'id_user' });

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


module.exports = {
  User,
  InternshipApplication,
  InternshipProgram,
  ForumSectionIoT,
  UserRating,
  IoTJournal,
  ProjectIoT,
  LectureIoT,
  ScheduleIoT
};