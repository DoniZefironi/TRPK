import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessons } from '../../store/slice/lectureSlice';
import lessonService from '../../service/LectureService';
import CreateLessonModal from '../CreateLessonModal/CreateLessonModal';
import UpdateLessonModal from '../UpdateLessonModal/UpdateLessonModal'; // Добавлен импорт

const LessonsPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const course = user?.permissions || '';
    const { lessons, status, error } = useSelector(state => state.lessons);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);

    useEffect(() => {
        if (course) {
            dispatch(fetchLessons(course));
        }
    }, [dispatch, course]);

    const handleDeleteLesson = async (id) => {
      try {
          if (!course || !id) {
              throw new Error('Недостаточно данных для удаления');
          }
          
          if (window.confirm('Вы уверены, что хотите удалить этот урок?')) {
              await lessonService.deleteLesson(course, id);
              dispatch(fetchLessons(course));
          }
      } catch (error) {
          console.error('Ошибка при удалении урока:', error);
          alert(error.message); // Показываем пользователю
      }
  };

    const handleUpdateClick = (lesson) => {
        setSelectedLesson(lesson);
        setUpdateModalOpen(true);
    };

    // Добавленная функция
    const handleUpdateLessons = () => {
        dispatch(fetchLessons(course));
    };

    return (
        <div className="events-control-section">
            <div className="filters">
                <input type="text" placeholder="Поиск урока..." />
                <button 
                    className="event-button" 
                    onClick={() => setCreateModalOpen(true)}
                >
                    Добавить урок
                </button>
            </div>

            {status === 'loading' && <p>Загрузка...</p>}
            {error && <p>Ошибка: {error}</p>}

            <div className="events-list1">
                {lessons?.rows?.length > 0 ? (
                    lessons.rows.map((lesson) => (
                        <div key={lesson.id} className="event-card1">
                            <div>
                                <p className="event-title">{lesson.lecture_title}</p>
                                <p className="event-date">{lesson.date}</p>
                                <p className="event-description">{lesson.description}</p>
                            </div>
                            <div>
                                <button 
                                    onClick={() => handleUpdateClick(lesson)} 
                                    className="event-button"
                                >
                                    Обновить
                                </button>
                                <button 
                                  onClick={() => handleDeleteLesson(lesson.id)} 
                                  className="event-button"
                              >
                                  Удалить
                              </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Нет доступных уроков</p>
                )}
            </div>

            {isCreateModalOpen && (
                <CreateLessonModal 
                    isOpen={isCreateModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    course={course}
                    onLessonCreated={handleUpdateLessons}
                />
            )}

            {isUpdateModalOpen && (
                <UpdateLessonModal 
                    isOpen={isUpdateModalOpen}
                    onClose={() => setUpdateModalOpen(false)}
                    course={course}
                    lesson={selectedLesson} // Должен содержать id
                    onLessonUpdated={handleUpdateLessons}
                />
            )}
        </div>
    );
};

export default LessonsPage;