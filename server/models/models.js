const sequelize = require('../db')
const {DataTypes} = require('sequelize')

// User Model
const User = sequelize.define('User', {
  id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING },
  permissions: { type: DataTypes.STRING },
});

// Class Model
const Class = sequelize.define('Class', {
  id_class: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_user: { type: DataTypes.INTEGER, allowNull: false },
  name_class: { type: DataTypes.STRING },
  list_user: { type: DataTypes.STRING },
});

// Lesson Model
const Lesson = sequelize.define('Lesson', {
  id_lesson: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  id_class: { type: DataTypes.INTEGER, allowNull: false },
  topic_lesson: { type: DataTypes.STRING },
  id_materials: { type: DataTypes.INTEGER },
});

// Career Guidance Model
const CareerGuidance = sequelize.define('CareerGuidance', {
  date_career_guidance: { type: DataTypes.DATE },
  topic_career_guidance: { type: DataTypes.STRING },
  consultants: { type: DataTypes.STRING },
  id_class: { type: DataTypes.INTEGER, allowNull: false },
});

// Forum Model
const Forum = sequelize.define('Forum', {
  rules: { type: DataTypes.STRING },
  section: { type: DataTypes.STRING },
});

// Forum Section Model
const ForumSection = sequelize.define('ForumSection', {
  subsections: { type: DataTypes.STRING },
  topic_subsections: { type: DataTypes.STRING },
  moderators: { type: DataTypes.STRING },
  id_user: { type: DataTypes.INTEGER },
  name: { type: DataTypes.STRING },
});

// Journal Model
const Journal = sequelize.define('Journal', {
  id_class: { type: DataTypes.INTEGER },
  grades: { type: DataTypes.JSONB },
  id_lesson: { type: DataTypes.INTEGER },
  change_date: { type: DataTypes.DATE },
});

// Schedule Model
const Schedule = sequelize.define('Schedule', {
  id_lesson: { type: DataTypes.INTEGER },
  id_class: { type: DataTypes.INTEGER },
  id_elective: { type: DataTypes.INTEGER },
  date: { type: DataTypes.DATE },
});

// Olympiad Model
const Olympiad = sequelize.define('Olympiad', {
  id_user: { type: DataTypes.INTEGER },
  name: { type: DataTypes.STRING },
  id_olympiads: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  topic_olympiads: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
});

// Olympiad Results Model
const OlympiadResults = sequelize.define('OlympiadResults', {
  id_result: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_olympiads: { type: DataTypes.INTEGER },
  team_name: { type: DataTypes.STRING },
  score: { type: DataTypes.FLOAT },
  position: { type: DataTypes.INTEGER },
});

// Elective Model
const Elective = sequelize.define('Elective', {
  id_user: { type: DataTypes.INTEGER },
  name: { type: DataTypes.STRING },
  topic_elective: { type: DataTypes.STRING },
});

// Materials Library Model
const MaterialsLibrary = sequelize.define('MaterialsLibrary', {
  id_material: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  topic_materials: { type: DataTypes.STRING },
});

/**
 * Relationships
 */
User.hasMany(Class, { foreignKey: 'id_user' });
Class.belongsTo(User, { foreignKey: 'id_user' });

Lesson.belongsTo(Class, { foreignKey: 'id_class' });
Class.hasMany(Lesson, { foreignKey: 'id_class' });

Lesson.belongsTo(MaterialsLibrary, { foreignKey: 'id_materials' });
MaterialsLibrary.hasMany(Lesson, { foreignKey: 'id_materials' });

CareerGuidance.belongsTo(Class, { foreignKey: 'id_class' });
Class.hasMany(CareerGuidance, { foreignKey: 'id_class' });

Forum.hasMany(ForumSection, { foreignKey: 'id_forum' });
ForumSection.belongsTo(Forum, { foreignKey: 'id_forum' });

Schedule.belongsTo(Class, { foreignKey: 'id_class' });
Class.hasMany(Schedule, { foreignKey: 'id_class' });

Olympiad.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(Olympiad, { foreignKey: 'id_user' });

OlympiadResults.belongsTo(Olympiad, { foreignKey: 'id_olympiads' });
Olympiad.hasMany(OlympiadResults, { foreignKey: 'id_olympiads' });

Elective.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(Elective, { foreignKey: 'id_user' });

Journal.belongsTo(Class, { foreignKey: 'id_class' });
Journal.belongsTo(Lesson, { foreignKey: 'id_lesson' });


module.exports = {
  User,
  Class,
  Lesson,
  CareerGuidance,
  Forum,
  ForumSection,
  Journal,
  Schedule,
  Olympiad,
  OlympiadResults,
  Elective,
  MaterialsLibrary,
};
