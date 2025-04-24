import axios from 'axios';

const API_URL = 'http://localhost:2280/api/lessons';

const LectureService = {
    getAllLessons: async (course) => {
        if (!course) throw new Error('Не указан курс');
        const response = await axios.get(`${API_URL}/${course}`);
        return response.data;
    },
    
    getLessonById: async (course, id) => {
        if (!course || !id) throw new Error('Не указан курс или ID урока');
        const response = await axios.get(`${API_URL}/${course}/${id}`);
        return response.data;
    },

    createLesson: async (course, lessonData) => {
        if (!course) throw new Error('Не указан курс');
        const response = await axios.post(`${API_URL}/${course}`, lessonData);
        return response.data;
    },

    updateLesson: async (course, id, lessonData) => {
        if (!course || !id) throw new Error('Не указан курс или ID урока');
        const response = await axios.put(`${API_URL}/${course}/${id}`, lessonData);
        return response.data;
    },

    deleteLesson: async (course, id) => {
        if (!course || !id) throw new Error('Не указан курс или ID урока');
        const response = await axios.delete(`${API_URL}/${course}/${id}`);
        return response.data;
    }
};

export default LectureService;