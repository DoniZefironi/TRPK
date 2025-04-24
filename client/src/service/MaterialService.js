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
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    },

    async fetchMaterialTopics() {
        const response = await axios.get(`${API_URL}/topics`);
        return response.data;
    },
};

export default materialsService;
