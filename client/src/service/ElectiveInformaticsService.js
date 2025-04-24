import axios from 'axios';

const API_URL = 'http://localhost:2280/api/electives';

// Создаем экземпляр axios с базовыми настройками
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default class ElectiveInformaticsService {
    static async createElective(name, topic_elective, id_user) {
        return api.post('/', { name, topic_elective, id_user });
    }

    static async getAllElectives(page = 1, limit = 10, search = '') {
        return api.get('/', {
            params: { page, limit, search }
        });
    }

    static async getElectiveById(id) {
        return api.get(`/${id}`);
    }

    static async updateElective(id, name, topic_elective) {
        return api.put(`/${id}`, { name, topic_elective });
    }

    static async deleteElective(id) {
        return api.delete(`/${id}`);
    }

    static async addParticipant(id, userId) {
        return api.post(`/${id}/participants`, { userId });
    }
}