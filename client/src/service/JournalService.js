import axios from 'axios';

const API_URL = 'http://localhost:2280/api/journal';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Токен авторизации не найден');
    throw new Error('Требуется авторизация');
  }
  return { 
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

const journalService = {
  getJournal: async (course, page = 1, limit = 10) => {
    try {
        page = Math.max(1, parseInt(page)) || 1;
        limit = Math.min(50, Math.max(1, parseInt(limit))) || 10;
        
        const response = await axios.get(`${API_URL}/${course}`, {
            params: { page, limit },
            headers: getAuthHeaders()
        });

        // Приводим данные к ожидаемой фронтендом структуре
        return {
            rows: response.data.rows || [],
            count: response.data.count || 0,
            currentPage: page,
            totalPages: Math.ceil(response.data.count / limit),
            limit
        };
    } catch (error) {
        console.error('Journal fetch error:', error);
        throw error.response?.data?.message || error.message;
    }
},

  getStudentGrades: async (course, id_user) => {
    try {
      const response = await axios.get(`${API_URL}/${course}/student/${id_user}`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  addGrade: async (data) => {
    try {
      const response = await axios.post(API_URL, data, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  updateGrade: async (course, id_journal, data) => {
    try {
      const response = await axios.put(`${API_URL}/${course}/${id_journal}`, data, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  deleteGrade: async (course, id_journal) => {
    try {
      const response = await axios.delete(`${API_URL}/${course}/${id_journal}`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  }
};

export default journalService;