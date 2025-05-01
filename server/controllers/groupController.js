const models = require('../models/models');
const sequelize = require('../db');
const ApiError = require('../error/ApiError');

    // Получить модель группы по курсу
    const getGroupModel = (course) => {
        // Приводим к формату, как в БД (первая буква заглавная)
        const formattedCourse = course.charAt(0).toUpperCase() + course.slice(1).toLowerCase();
        
        const modelsMap = {
          'Electric': models.ElectricGroup,
          'Iot': models.IoTGroup, // Обратите внимание на "Iot" вместо "IoT"
          'Informatics': models.InformaticsGroup
        };
        
        return modelsMap[formattedCourse] || null;
      };

    // Получить модель участника группы по курсу
    const getMemberModel = (course) => {
        const modelsMap = {
            'electric': models.ElectricGroupMember,
            'iot': models.IoTGroupMember,
            'informatics': models.InformaticsGroupMember
        };
        return modelsMap[course.toLowerCase()] || null;
    };

class GroupController {

    // Создание группы
    async createGroup(req, res, next) {
        try {
            const { course } = req.params; // получаем курс из URL
            const { name, description, status, max_members } = req.body;
            
            const groupModel = getGroupModel(course);
            
            if (!groupModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }
    
            const group = await groupModel.create({ name, description, status, max_members });
            return res.json(group);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
    async getAllMembers(req, res, next) {
        try {
          const { course } = req.params;
          const memberModel = getMemberModel(course);
          
          if (!memberModel) {
            return next(ApiError.badRequest('Недопустимый курс'));
          }
      
          const members = await memberModel.findAll({
            attributes: ['id_user', 'id_group']
          });
          
          return res.json(members);
        } catch (e) {
          next(ApiError.internal(e.message));
        }
      }
    // Получение всех групп с пагинацией
    async getAllGroups(req, res, next) {
        try {
            const { course } = req.params;
            let { page, limit } = req.query;
            
            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;

            const groupModel = getGroupModel(course);
            if (!groupModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const groups = await groupModel.findAndCountAll({
                limit,
                offset,
                order: [['created_at', 'DESC']],
                attributes: {
                    include: [
                        [sequelize.literal(`'${course}'`), 'course']
                    ]
                }
            });
            
            return res.json(groups);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Получение информации о группе
    async getGroup(req, res, next) {
        try {
            const { course, id } = req.params;
            const groupModel = getGroupModel(course);
            const memberModel = getMemberModel(course);
            
            if (!groupModel || !memberModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }
    
            const group = await groupModel.findByPk(id);
            if (!group) {
                return next(ApiError.notFound('Группа не найдена'));
            }
            
            // Получаем количество участников
            const memberCount = await memberModel.count({
                where: { id_group: id }
            });
            
            // Добавляем количество участников к данным группы
            const groupData = group.get({ plain: true });
            groupData.member_count = memberCount;
            groupData.course = course;
            
            return res.json(groupData);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Обновление группы
    async updateGroup(req, res, next) {
        try {
            const { course, id } = req.params;
            const { name, description, status, max_members } = req.body;
            
            const groupModel = getGroupModel(course);
            if (!groupModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const group = await groupModel.findByPk(id);
            if (!group) {
                return next(ApiError.notFound('Группа не найдена'));
            }

            await group.update({ name, description, status, max_members });
            return res.json(group);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Удаление группы
    async deleteGroup(req, res, next) {
        try {
            const { course, id } = req.params;
            const groupModel = getGroupModel(course);
            
            if (!groupModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const result = await groupModel.destroy({ where: { id_group: id } });
            if (!result) {
                return next(ApiError.notFound('Группа не найдена'));
            }
            
            return res.json({ message: 'Группа успешно удалена' });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Добавление участника в группу
    async addMember(req, res, next) {
        try {
            const { course, id } = req.params;
            // Принимаем либо userId, либо id_user для обратной совместимости
            const { userId, id_user, role = 'member' } = req.body;
            const memberId = userId || id_user;
            
            if (!memberId) {
                return next(ApiError.badRequest('ID пользователя не указан'));
            }
    
            const memberModel = getMemberModel(course);
            if (!memberModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }
    
            // Проверяем, что пользователь существует
            const user = await models.User.findByPk(memberId);
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }
    
            // Проверяем соответствие курса
            if (user.permissions.toLowerCase() !== course.toLowerCase()) {
                return next(ApiError.badRequest('Пользователь не принадлежит к этому курсу'));
            }
    
            // Проверяем существование группы
            const groupModel = getGroupModel(course);
            const group = await groupModel.findByPk(id);
            if (!group) {
                return next(ApiError.notFound('Группа не найдена'));
            }
    
            // Проверяем, не состоит ли уже пользователь в этой группе
            const existingMember = await memberModel.findOne({ 
                where: { id_group: id, id_user: memberId } 
            });
            
            if (existingMember) {
                return next(ApiError.badRequest('Пользователь уже в этой группе'));
            }
    
            // Проверяем участие в других группах этого курса
            const memberInOtherGroup = await memberModel.findOne({
                where: { id_user: memberId }
            });
            
            if (memberInOtherGroup) {
                return next(ApiError.badRequest('Пользователь уже состоит в другой группе этого курса'));
            }
    
            // Создаем запись участника
            const member = await memberModel.create({ 
                id_group: id, 
                id_user: memberId, 
                role,
                status: 'active'
            });
            
            return res.json({
                success: true,
                member: {
                    id: member.id,
                    id_group: member.id_group,
                    id_user: member.id_user,
                    role: member.role
                }
            });
        } catch (e) {
            console.error('Ошибка добавления участника:', e);
            next(ApiError.internal(e.message));
        }
    }

    // Получение участников группы
    async getMembers(req, res, next) {
        try {
            const { course, id } = req.params;
            const memberModel = getMemberModel(course);
            
            if (!memberModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const members = await memberModel.findAll({ 
                where: { id_group: id },
                include: [{
                    model: models.User,
                    attributes: ['id_user', 'username', 'email', 'avatar']
                }]
            });
            
            return res.json(members);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Обновление участника группы
    async updateMember(req, res, next) {
        try {
            const { course, id, userId } = req.params;
            const { role, status } = req.body;
            
            const memberModel = getMemberModel(course);
            if (!memberModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const member = await memberModel.findOne({ 
                where: { id_group: id, id_user: userId } 
            });
            
            if (!member) {
                return next(ApiError.notFound('Участник не найден'));
            }

            await member.update({ role, status });
            return res.json(member);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Удаление участника из группы
    async removeMember(req, res, next) {
        try {
            const { course, id, userId } = req.params;
            const memberModel = getMemberModel(course);
            
            if (!memberModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const result = await memberModel.destroy({ 
                where: { id_group: id, id_user: userId } 
            });
            
            if (!result) {
                return next(ApiError.notFound('Участник не найден'));
            }
            
            return res.json({ message: 'Участник успешно удален из группы' });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // В GroupController.js
async checkUserInGroup(req, res, next) {
    try {
        const { course, id, userId } = req.params;
        const memberModel = getMemberModel(course);
        
        if (!memberModel) {
            return next(ApiError.badRequest('Недопустимый курс'));
        }

        const member = await memberModel.findOne({
            where: { id_group: id, id_user: userId }
        });

        return res.json({ isMember: !!member });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
}
}

module.exports = new GroupController();