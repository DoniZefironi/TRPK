import api from './api';

class ElectiveInformaticsService {
  // Создание факультатива
  async create(data) {
    try {
      const response = await api.post('/electives', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Получение списка факультативов
  async getAll({ page = 1, limit = 10, search = '' } = {}) {
    try {
      const response = await api.get('/electives', {
        params: { page, limit, search }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Получение одного факультатива
  async getOne(id) {
    try {
      const response = await api.get(`/electives/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Обновление факультатива
  async update(id, data) {
    try {
      const response = await api.put(`/electives/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Удаление факультатива
  async delete(id) {
    try {
      const response = await api.delete(`/electives/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Добавление участника
  async addParticipant(electiveId, userId) {
    try {
      const response = await api.post(`/electives/${electiveId}/participants`, { userId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Удаление участника
  async removeParticipant(electiveId, userId) {
    try {
      const response = await api.delete(`/electives/${electiveId}/participants/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

export default new ElectiveInformaticsService();