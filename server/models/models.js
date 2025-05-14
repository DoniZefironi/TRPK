const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const allowedCourses = ['Electric', 'IoT', 'Informatics'];

// Фабрика моделей
const createModel = (name, attributes, options = {}) => {
  return sequelize.define(name, attributes, options);
};

// Основные модели
const User = createModel('User', {
  id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
  permissions: {
    type: DataTypes.ENUM('Electric', 'Informatics', 'IoT'),
    allowNull: false,
    defaultValue: 'Electric'
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

const ForumSection = createModel('ForumSection', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  type: { 
    type: DataTypes.ENUM('Electric', 'Informatics', 'IoT'),
    allowNull: false 
  },
  description: { type: DataTypes.TEXT }
}, { timestamps: false });

const ForumTopic = createModel('ForumTopic', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  views: { type: DataTypes.INTEGER, defaultValue: 0 },
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id_user'
    }
  },
  sectionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ForumSections',
      key: 'id'
    }
  }
}, { timestamps: true });

const ForumPost = createModel('ForumPost', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.TEXT, allowNull: false }
}, { timestamps: true });

const MaterialsLibrary = createModel('MaterialsLibrary', {
  id_material: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  topic_materials: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT, allowNull: true },
  file_url: { type: DataTypes.STRING, allowNull: true },
  upload_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Фабрики для повторяющихся моделей
const createGroupModel = (course) => {
  return createModel(`${course}Group`, {
    id_group: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.STRING, defaultValue: 'active' },
    max_members: { type: DataTypes.INTEGER, allowNull: true },
  });
};

const createGroupMemberModel = (course) => {
  return createModel(`${course}GroupMember`, {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, defaultValue: 'member' },
    joined_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.STRING, defaultValue: 'active' },
  });
};

const createLectureModel = (course) => {
  return createModel(`Lecture${course}`, {
    id_classes: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    lecture_title: { type: DataTypes.STRING, allowNull: false },
    id_materials: { type: DataTypes.INTEGER },
    description: { type: DataTypes.TEXT },
    duration: { type: DataTypes.STRING },
    date: { type: DataTypes.STRING },
    slides: { type: DataTypes.STRING }
  });
};

const createJournalModel = (course) => {
  return createModel(`Journal${course}`, {
    id_journal: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    grades: { type: DataTypes.STRING },
    id_classes: { 
      type: DataTypes.INTEGER,
      references: {
        model: `Lecture${course}`,
        key: 'id_classes'
      }
    },
    change_date: { type: DataTypes.DATE },
    academic_performance: { type: DataTypes.STRING },
    id_user: { 
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id_user'
      }
    }
  });
};

const createScheduleModel = (course) => {
  return createModel(`Schedule${course}`, {
    id_schedule: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_classes: { type: DataTypes.INTEGER },
    date: { type: DataTypes.DATE },
    time: { type: DataTypes.TIME, allowNull: true }
  });
};

// Создание моделей для каждого курса
const models = {};

allowedCourses.forEach(course => {
  // Группы
  models[`${course}Group`] = createGroupModel(course);
  models[`${course}GroupMember`] = createGroupMemberModel(course);
  
  // Лекции, журналы, расписания
  models[`Lecture${course}`] = createLectureModel(course);
  models[`Journal${course}`] = createJournalModel(course);
  models[`Schedule${course}`] = createScheduleModel(course);
});

// Уникальные модели для каждого курса
// Electric
models.HackathonElectric = createModel('HackathonElectric', {
  id_hackathon: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  topic: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  organizers: { type: DataTypes.STRING },
  id_user: { type: DataTypes.INTEGER }
});

models.HackathonResultsElectric = createModel('HackathonResultsElectric', {
  id_result: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_hackathon: { type: DataTypes.INTEGER },
  team_name: { type: DataTypes.STRING },
  project_name: { type: DataTypes.STRING },
  score: { type: DataTypes.FLOAT },
  position: { type: DataTypes.INTEGER }
});

models.ProjectElectric = createModel('ProjectElectric', {
  id_project: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  deadlines: { type: DataTypes.DATE },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.STRING, defaultValue: 'in_progress' },
});

// IoT
models.InternshipApplicationIoT = createModel('InternshipApplicationIoT', {
  application_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  contacts: { type: DataTypes.STRING },
  application_date: { type: DataTypes.DATE },
  application_status: { type: DataTypes.STRING },
  resume_link: { type: DataTypes.STRING },
  id_user: { type: DataTypes.INTEGER }
});

models.InternshipProgramIoT = createModel('InternshipProgramIoT', {
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

models.ProjectIoT = createModel('ProjectIoT', {
  id_project: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  project_name: { type: DataTypes.STRING },
  team_members: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  id_user: { type: DataTypes.INTEGER }
});

// Informatics
models.CareerGuidanceInformatics = createModel('CareerGuidanceInformatics', {
  id_guidance: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date_career_guidance: { type: DataTypes.DATE },
  topic_career_guidance: { type: DataTypes.STRING },
  consultants: { type: DataTypes.STRING },
});

models.OlympiadInformatics = createModel('OlympiadInformatics', {
  id_olympiads: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  topic_olympiads: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  id_user: { type: DataTypes.INTEGER }
});

models.OlympiadResultsInformatics = createModel('OlympiadResultsInformatics', {
  id_result: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_olympiads: { type: DataTypes.INTEGER },
  team_name: { type: DataTypes.STRING },
  score: { type: DataTypes.FLOAT },
  position: { type: DataTypes.INTEGER }
});

models.ElectiveInformatics = createModel('ElectiveInformatics', {
  id_elective: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  topic_elective: { type: DataTypes.STRING }
  // Убрали id_user, так как теперь связь через промежуточную таблицу
});

// Промежуточная таблица
models.ElectiveUser = createModel('ElectiveUser', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_elective: { type: DataTypes.INTEGER },
  id_user: { type: DataTypes.INTEGER }
});

// Auth
models.RefreshToken = createModel('RefreshToken', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_user: { type: DataTypes.INTEGER, allowNull: false },
  refresh_token: { type: DataTypes.TEXT, allowNull: false },
});


// Промежуточные модели для связей многие-ко-многим
models.HackathonParticipants = sequelize.define('HackathonParticipants', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  result_id: { type: DataTypes.INTEGER },
  user_id: { type: DataTypes.INTEGER },
  createdAt: { 
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updatedAt: { 
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
});

models.OlympiadParticipants = sequelize.define('OlympiadParticipants', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  result_id: { type: DataTypes.INTEGER },
  user_id: { type: DataTypes.INTEGER },
  createdAt: { 
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updatedAt: { 
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
});

// Установка связей между моделями
const setupAssociations = () => {
  // Общие связи
  models.User.hasMany(models.RefreshToken, { foreignKey: 'id_user' });
  models.RefreshToken.belongsTo(models.User, { foreignKey: 'id_user' });

  // Связи для форума
models.User.hasMany(models.ForumTopic, { 
  foreignKey: 'userId',
  sourceKey: 'id_user', // Явно указываем связь
  as: 'topics'
});

models.ForumTopic.belongsTo(User, { 
  foreignKey: 'userId',
  targetKey: 'id_user', // Явно указываем связь
  as: 'author'
});


models.ForumSection.hasMany(models.ForumTopic, {
  foreignKey: 'sectionId',
  as: 'topics'
});
models.ForumTopic.belongsTo(models.ForumSection, {
  foreignKey: 'sectionId',
  as: 'section'
});

  models.ForumTopic.hasMany(ForumPost, { foreignKey: 'topicId', as: 'ForumPosts' });
  models.ForumPost.belongsTo(models.ForumTopic, { foreignKey: 'topicId' });

  models.User.hasMany(models.ForumPost, { foreignKey: 'userId' });
  models.ForumPost.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });

  // Связи для материалов
  models.MaterialsLibrary.hasMany(models.LectureElectric, { foreignKey: 'id_materials' });
  models.LectureElectric.belongsTo(models.MaterialsLibrary, { foreignKey: 'id_materials' });

  models.MaterialsLibrary.hasMany(models.LectureIoT, { foreignKey: 'id_materials' });
  models.LectureIoT.belongsTo(models.MaterialsLibrary, { foreignKey: 'id_materials' });

  models.MaterialsLibrary.hasMany(models.LectureInformatics, { foreignKey: 'id_materials' });
  models.LectureInformatics.belongsTo(models.MaterialsLibrary, { foreignKey: 'id_materials' });

  // Связи для каждого курса
  allowedCourses.forEach(course => {
    const Group = models[`${course}Group`];
    const GroupMember = models[`${course}GroupMember`];
    const Lecture = models[`Lecture${course}`];
    const Journal = models[`Journal${course}`];
    const Schedule = models[`Schedule${course}`];

    // Связи групп
    models.User.belongsToMany(Group, { through: GroupMember, foreignKey: 'id_user' });
    Group.belongsToMany(models.User, { through: GroupMember, foreignKey: 'id_group' });

    GroupMember.belongsTo(models.User, { foreignKey: 'id_user' });
    models.User.hasMany(GroupMember, { foreignKey: 'id_user' });

    // Связи лекций, журналов и расписаний
    Group.hasMany(Lecture, { foreignKey: 'id_group' });
    Lecture.belongsTo(Group, { foreignKey: 'id_group' });

    Group.hasMany(Journal, { foreignKey: 'id_group' });
    Journal.belongsTo(Group, { foreignKey: 'id_group' });

    models.User.hasMany(Journal, { foreignKey: 'id_user' });
    Journal.belongsTo(models.User, { foreignKey: 'id_user' });

    Group.hasMany(Schedule, { foreignKey: 'id_group' });
    Schedule.belongsTo(Group, { foreignKey: 'id_group' });

    Lecture.hasMany(Journal, { foreignKey: 'id_classes' });
    Journal.belongsTo(Lecture, { foreignKey: 'id_classes' });

    Lecture.hasMany(Schedule, { foreignKey: 'id_classes' });
    Schedule.belongsTo(Lecture, { foreignKey: 'id_classes' });
  });

  // Дополнительные связи для уникальных моделей
  models.User.hasMany(models.ProjectElectric, { foreignKey: 'creator_id' });
  models.ProjectElectric.belongsTo(models.User, { foreignKey: 'creator_id' });

  models.User.hasMany(models.InternshipApplicationIoT, { foreignKey: 'id_user' });
  models.InternshipApplicationIoT.belongsTo(models.User, { foreignKey: 'id_user' });

  models.User.hasMany(models.ProjectIoT, { foreignKey: 'id_user' });
  models.ProjectIoT.belongsTo(models.User, { foreignKey: 'id_user' });

  models.User.hasMany(models.OlympiadInformatics, { foreignKey: 'id_user' });
  models.OlympiadInformatics.belongsTo(models.User, { foreignKey: 'id_user' });

  models.ElectiveInformatics.belongsToMany(models.User, {
    through: models.ElectiveUser,
    foreignKey: 'id_elective',
    otherKey: 'id_user',
    as: 'participants'
  });
  
  models.User.belongsToMany(models.ElectiveInformatics, {
    through: models.ElectiveUser,
    foreignKey: 'id_user',
    otherKey: 'id_elective',
    as: 'electives'
  });

  models.HackathonElectric.hasMany(models.HackathonResultsElectric, { foreignKey: 'id_hackathon' });
  models.HackathonResultsElectric.belongsTo(models.HackathonElectric, { foreignKey: 'id_hackathon' });

  models.OlympiadInformatics.hasMany(models.OlympiadResultsInformatics, { foreignKey: 'id_olympiads' });
  models.OlympiadResultsInformatics.belongsTo(models.OlympiadInformatics, { foreignKey: 'id_olympiads' });

    // Связи для участников соревнований
    models.HackathonResultsElectric.belongsToMany(models.User, {
      through: models.HackathonParticipants,
      foreignKey: 'result_id',
      otherKey: 'user_id',
      as: 'participants'
    });
  
    models.User.belongsToMany(models.HackathonResultsElectric, {
      through: models.HackathonParticipants,
      foreignKey: 'user_id',
      otherKey: 'result_id',
      as: 'hackathonResults'
    });
  
    models.OlympiadResultsInformatics.belongsToMany(models.User, {
      through: models.OlympiadParticipants,
      foreignKey: 'result_id',
      otherKey: 'user_id',
      as: 'participants'
    });
  
    models.User.belongsToMany(models.OlympiadResultsInformatics, {
      through: models.OlympiadParticipants,
      foreignKey: 'user_id',
      otherKey: 'result_id',
      as: 'olympiadResults'
    });

    // Для ProjectElectric
    models.ProjectIoT.belongsToMany(models.User, {
      through: 'ProjectIoTMembers',
      foreignKey: 'project_id',
      otherKey: 'user_id',
      as: 'members'  // Changed from 'team_members' to 'members'
    });
    
    models.User.belongsToMany(models.ProjectIoT, {
      through: 'ProjectIoTMembers',
      foreignKey: 'user_id',
      otherKey: 'project_id',
      as: 'iot_projects'
    });
    
    // Similarly for ProjectElectric if it has the same issue:
    models.ProjectElectric = createModel('ProjectElectric', {
      id_project: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      deadlines: { type: DataTypes.DATE },
      name: { type: DataTypes.STRING },
      description: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.STRING, defaultValue: 'in_progress' },
    });
    
    // And its associations:
    models.ProjectElectric.belongsToMany(models.User, {
      through: 'ProjectElectricMembers',
      foreignKey: 'project_id',
      otherKey: 'user_id',
      as: 'members'  // Changed from 'team_members' to 'members'
    });
    
    models.User.belongsToMany(models.ProjectElectric, {
      through: 'ProjectElectricMembers',
      foreignKey: 'user_id',
      otherKey: 'project_id',
      as: 'electric_projects'
    });
};

models.User = User;
models.ForumSection = ForumSection;
models.ForumTopic = ForumTopic;
models.ForumPost = ForumPost;
models.MaterialsLibrary = MaterialsLibrary;

// Устанавливаем связи
setupAssociations();

// Экспорт всех моделей
module.exports = models;