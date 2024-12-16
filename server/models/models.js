const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {
  id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING },
  permissions: { type: DataTypes.STRING }
});

const MaterialsLibrary = sequelize.define('MaterialsLibrary', {
  id_material: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  topic_materials: { type: DataTypes.STRING }
});

const Forum = sequelize.define('Forum', {
  id_forum: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rules: { type: DataTypes.STRING },
  section: { type: DataTypes.STRING }
});

const ForumSection = sequelize.define('ForumSection', {
  id_section: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: {type: DataTypes.STRING},
  subsections: { type: DataTypes.STRING },
  topic_subsections: { type: DataTypes.STRING },
  moderators: { type: DataTypes.STRING },
  id_user: { type: DataTypes.INTEGER }
});

const Group = sequelize.define('Group', {
  id_group: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_user: { type: DataTypes.INTEGER },
  name_group: { type: DataTypes.STRING },
  list_user: { type: DataTypes.STRING }
});

const Classes = sequelize.define('Classes', {
  id_classes: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_group: { type: DataTypes.INTEGER },
  topic_classes: { type: DataTypes.STRING },
  id_materials: { type: DataTypes.INTEGER },
  name: {type: DataTypes.STRING}
});

const Journal = sequelize.define('Journal', {
  id_journal: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_group: { type: DataTypes.INTEGER },
  grades: { type: DataTypes.STRING },
  id_classes: { type: DataTypes.INTEGER },
  change_date: { type: DataTypes.DATE },
  academic_performance: { type: DataTypes.STRING }
});

const Hackathon = sequelize.define('Hackathon', {
  id_hackathon: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  topic: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  organizers: { type: DataTypes.STRING },
  id_user: { type: DataTypes.INTEGER }
});

const HackathonResults = sequelize.define('HackathonResults', {
  id_result: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_hackathon: { type: DataTypes.INTEGER },
  team_name: { type: DataTypes.STRING },
  project_name: { type: DataTypes.STRING },
  score: { type: DataTypes.FLOAT },
  position: { type: DataTypes.INTEGER }
});

const Schedule = sequelize.define('Schedule', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_classes: { type: DataTypes.INTEGER },
  id_group: { type: DataTypes.INTEGER },
  date: { type: DataTypes.DATE }
});

const Project = sequelize.define('Project', {
  id_project: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_user: { type: DataTypes.INTEGER },
  deadlines: { type: DataTypes.DATE },
  name: { type: DataTypes.STRING },
  id_emulator: { type: DataTypes.INTEGER }
});

const Emulator = sequelize.define('Emulator', {
  id_emulator: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  device_type: { type: DataTypes.STRING },
  functionality: { type: DataTypes.STRING }
});

const EmulatorLog = sequelize.define('EmulatorLog', {
  id_log: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_emulator: { type: DataTypes.INTEGER },
  timestamp: { type: DataTypes.DATE },
  action: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING }
});

const EmulatorConfiguration = sequelize.define('EmulatorConfiguration', {
  id_config: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_emulator: { type: DataTypes.INTEGER },
  config_name: { type: DataTypes.STRING },
  settings: { type: DataTypes.STRING }
});


User.hasMany(Group, { foreignKey: 'id_user' });
User.hasMany(Project, { foreignKey: 'id_user' });
User.hasMany(Hackathon, { foreignKey: 'id_user' });

Hackathon.hasMany(HackathonResults, { foreignKey: 'id_hackathon' });
HackathonResults.belongsTo(Hackathon, { foreignKey: 'id_hackathon' });

Group.hasMany(Classes, { foreignKey: 'id_group' });
Classes.belongsTo(Group, { foreignKey: 'id_group' });

Classes.hasMany(Schedule, { foreignKey: 'id_classes' });
Schedule.belongsTo(Classes, { foreignKey: 'id_classes' });

Project.belongsTo(Emulator, { foreignKey: 'id_emulator' });
Emulator.hasMany(Project, { foreignKey: 'id_emulator' });

Emulator.hasMany(EmulatorLog, { foreignKey: 'id_emulator' });
EmulatorLog.belongsTo(Emulator, { foreignKey: 'id_emulator' });

Emulator.hasMany(EmulatorConfiguration, { foreignKey: 'id_emulator' });
EmulatorConfiguration.belongsTo(Emulator, { foreignKey: 'id_emulator' });

MaterialsLibrary.hasMany(Classes, { foreignKey: 'id_material' });
Classes.belongsTo(MaterialsLibrary, { foreignKey: 'id_material' });

Forum.hasMany(ForumSection, { foreignKey: 'id_forum' });
ForumSection.belongsTo(Forum, { foreignKey: 'id_forum' });


module.exports = {
  User,
  MaterialsLibrary,
  Forum,
  ForumSection,
  Group,
  Classes,
  Journal,
  Hackathon,
  HackathonResults,
  Schedule,
  Project,
  Emulator,
  EmulatorLog,
  EmulatorConfiguration
};
