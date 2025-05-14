import axios from 'axios';

const API_URL = 'http://localhost:2280/api/lessons';

class LessonService {
// Проверка валидности курса
#validateCourse(course) {
    const validCourses = ['electric', 'iot', 'informatics'];
    if (!validCourses.includes(course.toLowerCase())) {
      throw new Error(`Invalid course: ${course}. Valid courses are: ${validCourses.join(', ')}`);
    }
  }
  

  // Создание лекции
  async create(course, lessonData) {
    this.#validateCourse(course);
    const response = await axios.post(`${API_URL}/${course}`, lessonData);
   return response;
  }

  // Получение всех лекций курса
  async getAll(course) {
    this.#validateCourse(course);
    const response = await axios.get(`${API_URL}/${course}`);
    
    // Добавьте проверку структуры данных
    if (!Array.isArray(response.data)) {
      console.error('Invalid data format:', response.data);
      throw new Error('Expected array of lessons');
    }
    
    console.log('Server response:', course, response.data);
    return response.data;
  }
  // Получение лекции по ID
  async getById(course, id) {
    this.#validateCourse(course);
    const response = await axios.get(`${API_URL}/${course}/${id}`);
    return response;
  }

  // Обновление лекции
  async update(course, id, updatedData) {
    this.#validateCourse(course);
    const response = await axios.put(`${API_URL}/${course}/${id}`, updatedData);
    return response;
  }

  // Удаление лекции
  async delete(course, id) {
    this.#validateCourse(course);
    await axios.delete(`${API_URL}/${course}/${id}`);
    return { course, id };
  }
}

export default new LessonService();