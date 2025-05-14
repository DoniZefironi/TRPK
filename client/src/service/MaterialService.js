import axios from 'axios';

const API_URL = 'http://localhost:2280/api/materials'; // Укажите актуальный адрес сервера

const materialsService = {
    async fetchMaterials({ page = 1, limit = 10, search = '', topic = '' }) {
        const response = await axios.get(API_URL, {
            params: { page, limit, search, topic },
        });
        return response.data;
    },

    async fetchMaterialById(id) {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    async createMaterial(data) {
        const response = await axios.post(API_URL, data);
        return response.data;
    },

    async updateMaterial(id, data) {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    },

    async deleteMaterial(id) {
        try {
            console.log(`Attempting to delete material with ID: ${id} at ${API_URL}/${id}`);
            const response = await axios.delete(`${API_URL}/${id}`);
            console.log('Delete successful:', response.data);
            return response.data;
        } catch (error) {
            console.error('Delete error:', error);
            console.error('Error details:', {
                url: `${API_URL}/${id}`,
                status: error.response?.status,
                data: error.response?.data
            });
            throw error;
        }
    },

    async fetchMaterialTopics() {
        const response = await axios.get(`${API_URL}/topics`);
        return response.data;
    },
};

export default materialsService;
