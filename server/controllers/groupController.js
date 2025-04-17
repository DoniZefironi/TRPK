const { ElectricGroup, IoTGroup, InformaticsGroup, ElectricGroupMember, IoTGroupMember, InformaticsGroupMember, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class GroupController {

    // Создание группы
    async createGroup(req, res) {
        try {
            const { name, description, course } = req.body;
    
            let groupModel;
            if (course === 'electronics') groupModel = ElectricGroup;
            else if (course === 'iot') groupModel = IoTGroup;
            else if (course === 'informatics') groupModel = InformaticsGroup;
            else return res.status(400).json({ error: 'Недопустимый курс' });
    
            const group = await groupModel.create({ name, description });
            res.status(201).json(group);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    
    // Удаление группы
    async deleteGroup(req, res) {
        try {
            const { course, id } = req.params;
    
            let groupModel;
            if (course === 'electronics') groupModel = ElectricGroup;
            else if (course === 'iot') groupModel = IoTGroup;
            else if (course === 'informatics') groupModel = InformaticsGroup;
            else return res.status(400).json({ error: 'Недопустимый курс' });
    
            await groupModel.destroy({ where: { id_group: id } });
            res.json({ message: 'Группа удалена' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    
    // Добавление участника в группу
    async addMemberToGroup(req, res) {
        try {
            const { course, id } = req.params;
            const { userId, role } = req.body;
    
            let memberModel;
            if (course === 'electronics') memberModel = ElectricGroupMember;
            else if (course === 'iot') memberModel = IoTGroupMember;
            else if (course === 'informatics') memberModel = InformaticsGroupMember;
            else return res.status(400).json({ error: 'Недопустимый курс' });
    
            const member = await memberModel.create({ id_group: id, id_user: userId, role });
            res.status(201).json(member);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async updateGroup(req, res) {
        try {
            const { course, id } = req.params;
            const { name, description, status, max_members } = req.body;
    
            let groupModel;
            if (course === 'electronics') groupModel = ElectricGroup;
            else if (course === 'iot') groupModel = IoTGroup;
            else if (course === 'informatics') groupModel = InformaticsGroup;
            else return res.status(400).json({ error: 'Недопустимый курс' });
    
            const group = await groupModel.findByPk(id);
            if (!group) return res.status(404).json({ error: 'Группа не найдена' });
    
            await group.update({ name, description, status, max_members });
            res.status(200).json({ message: 'Группа обновлена', group });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    
    async updateMember(req, res) {
        try {
            const { course, id, userId } = req.params;
            const { role, status } = req.body;
    
            let memberModel;
            if (course === 'electronics') memberModel = ElectricGroupMember;
            else if (course === 'iot') memberModel = IoTGroupMember;
            else if (course === 'informatics') memberModel = InformaticsGroupMember;
            else return res.status(400).json({ error: 'Недопустимый курс' });
    
            const member = await memberModel.findOne({ where: { id_group: id, id_user: userId } });
            if (!member) return res.status(404).json({ error: 'Участник не найден' });
    
            await member.update({ role, status });
            res.status(200).json({ message: 'Данные участника обновлены', member });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    
    async getAllGroups(req, res) {
        try {
            const { course } = req.params;
    
            let groupModel;
            if (course === 'electronics') groupModel = ElectricGroup;
            else if (course === 'iot') groupModel = IoTGroup;
            else if (course === 'informatics') groupModel = InformaticsGroup;
            else return res.status(400).json({ error: 'Недопустимый курс' });
    
            const groups = await groupModel.findAll();
            res.status(200).json(groups);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getGroupMembers(req, res) {
        try {
            const { course, id } = req.params;
    
            let memberModel;
            if (course === 'electronics') memberModel = ElectricGroupMember;
            else if (course === 'iot') memberModel = IoTGroupMember;
            else if (course === 'informatics') memberModel = InformaticsGroupMember;
            else return res.status(400).json({ error: 'Недопустимый курс' });
    
            const members = await memberModel.findAll({ where: { id_group: id }, include: [{ model: User, required: true }] });
            res.status(200).json(members);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    
}

module.exports = new GroupController();
