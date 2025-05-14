import axios from 'axios';

const API_URL = 'http://localhost:2280/api';

const scheduleService = {
  async getLectures(course) {
    try {
      const response = await axios.get(`${API_URL}/lessons/${course}`);
      console.log('Lectures response:', response.data); // Логируем ответ
      
      // Обрабатываем разные форматы ответа
      if (Array.isArray(response.data)) {
        return { data: response.data };
      }
      if (response.data && Array.isArray(response.data.data)) {
        return response.data;
      }
      throw new Error(`Неверный формат данных лекций: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error('Ошибка загрузки лекций:', error);
      return { data: [] };
    }
  },

  async getGroups(course) {
    try {
      const response = await axios.get(`${API_URL}/groups/${course}`);
      console.log('Groups response:', response.data); // Логируем ответ
      
      // Обрабатываем разные форматы ответа
      if (Array.isArray(response.data)) {
        return { data: response.data };
      }
      if (response.data && Array.isArray(response.data.data)) {
        return response.data;
      }
      throw new Error(`Неверный формат данных групп: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error('Ошибка загрузки групп:', error);
      return { data: [] };
    }
  },

    async createScheduleItem(course, data) {
        try {
          const response = await axios.post(`${API_URL}/schedule/${course}`, data);
          return response.data;
        } catch (error) {
          console.error('Error creating schedule item:', error);
          throw error;
        }
      },
    
      async getSchedule(course, params = {}) {
        try {
          const response = await axios.get(`${API_URL}/schedule/${course}`, { params });
          return response.data;
        } catch (error) {
          console.error('Error fetching schedule:', error);
          throw error;
        }
      },

    async getGroupSchedule(course, groupId, params = {}) {
        const response = await axios.get(`${API_URL}/schedule/${course}/group/${groupId}`, { params });
        return response.data;
    },

    async getScheduleItem(course, id) {
        const response = await axios.get(`${API_URL}/schedule/${course}/${id}`);
        return response.data;
    },

    async updateScheduleItem(course, id, data) {
        const response = await axios.put(`${API_URL}/schedule/${course}/${id}`, data);
        return response.data;
    },

    async deleteScheduleItem(course, id) {
        const response = await axios.delete(`${API_URL}/schedule/${course}/${id}`);
        return response.data;
    },

    async getScheduleByDate(course, date, groupId = null) {
        const params = { date };
        if (groupId) params.id_group = groupId;
        const response = await axios.get(`${API_URL}/schedule/${course}/date`, { params });
        return response.data;
    },

};

export default scheduleService;