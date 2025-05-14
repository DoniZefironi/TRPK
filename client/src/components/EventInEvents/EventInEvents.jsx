import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchLessons,
  selectLessonsByCourse,
  createLesson,
  updateLesson,
  deleteLesson
} from '../../store/slice/lectureSlice';
import {
  fetchMaterials,
  selectAllMaterials
} from '../../store/slice/materialSlice';
import './EventInEvents.css';

const LessonsListPage = () => {
  const [course, setCourse] = useState('electric');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [newLecture, setNewLecture] = useState({
    lecture_title: '',
    id_materials: '',
    description: '',
    duration: '1 час',
    date: '',
    slides: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [expandedLessonId, setExpandedLessonId] = useState(null);
  const dispatch = useDispatch();

  const lessons = useSelector(selectLessonsByCourse(course)) || [];
  const sortedLessons = [...lessons].sort((a, b) => new Date(b.date) - new Date(a.date));
  const materials = useSelector(selectAllMaterials);
  const { status: lessonsStatus, error: lessonsError } = useSelector(state => state.lessons);
  const { loading: materialsLoading } = useSelector(state => state.materials);

  useEffect(() => {
    if (course) {
      dispatch(fetchLessons(course));
      dispatch(fetchMaterials({}));
    }
  }, [course, dispatch]);

  const toggleLessonDetails = (id) => {
    setExpandedLessonId(expandedLessonId === id ? null : id);
  };

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
    setErrorMessage('');
  };

  const handleAddLecture = () => {
    setShowAddModal(true);
  };

  const handleEditLecture = (lesson) => {
    setCurrentLesson(lesson);
    setNewLecture({
      lecture_title: lesson.lecture_title,
      id_materials: lesson.id_materials || '',
      description: lesson.description || '',
      duration: lesson.duration || '1 час',
      date: lesson.date ? lesson.date.split('T')[0] : '',
      slides: lesson.slides || ''
    });
    setShowEditModal(true);
  };

  const handleDeleteLecture = async (lessonId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту лекцию?')) {
      try {
        await dispatch(deleteLesson({ course, id: lessonId })).unwrap();
        dispatch(fetchLessons(course));
      } catch (err) {
        console.error('Не удалось удалить лекцию:', err);
        setErrorMessage(err.message || 'Ошибка удаления лекции.');
      }
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setCurrentLesson(null);
    setNewLecture({
      lecture_title: '',
      id_materials: '',
      description: '',
      duration: '1 час',
      date: '',
      slides: ''
    });
    setErrorMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLecture(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!newLecture.lecture_title || !newLecture.date || !newLecture.duration) {
    setErrorMessage('Пожалуйста, заполните все обязательные поля');
    return;
  }

  try {
    if (showEditModal && currentLesson) {
      await dispatch(updateLesson({
        course,
        id: currentLesson.id_classes,
        updatedData: {
          ...newLecture,
          id_materials: newLecture.id_materials || null
        }
      })).unwrap();
      // Сбрасываем состояние после успешного редактирования
      setExpandedLessonId(null);
      handleCloseModal();
      dispatch(fetchLessons(course));
    } else {
      await dispatch(createLesson({
        course,
        lessonData: {
          ...newLecture,
          id_materials: newLecture.id_materials || null
        }
      })).unwrap();
      // Сбрасываем состояние после успешного добавления
      setExpandedLessonId(null);
      handleCloseModal();
      dispatch(fetchLessons(course));
    }
  } catch (err) {
    console.error('Ошибка при сохранении лекции:', err);
    setErrorMessage(err.message || 'Не удалось сохранить лекцию. Попробуйте снова.');
  }
};

  if (lessonsStatus === 'loading') return <div className="lessons-loading">Загрузка...</div>;
  if (lessonsError) return <div className="lessons-error">Ошибка: {lessonsError}</div>;

  return (
    <div className="lessons-container">
      <div className="lessons-header">
        <h2 className="lessons-title">Лекции</h2>
        <div className="lessons-controls">
          <div className="course-select">
            <label htmlFor="course-select" className="course-label">
              Выберите курс:
            </label>
            <select
              id="course-select"
              value={course}
              onChange={handleCourseChange}
              className="select-input"
            >
              <option value="electric">Электрика</option>
              <option value="iot">IoT</option>
              <option value="informatics">Информатика</option>
            </select>
          </div>
          <button
            onClick={handleAddLecture}
            className="add-button"
          >
            Добавить лекцию
          </button>
        </div>
      </div>

      <div className="lessons-list">
        {sortedLessons.length > 0 ? (
          <ul className="lessons-items">
            {sortedLessons.map(lesson => {
              const material = materials.find(m => m.id_material === lesson.id_materials);
              return (
                <li
                  key={lesson.id_classes}
                  className={`lesson-item ${expandedLessonId === lesson.id_classes ? 'expanded' : ''}`}
                >
                  <div
                    className="lesson-summary"
                    onClick={() => toggleLessonDetails(lesson.id_classes)}
                  >
                    <div className="lesson-main-info">
                      <h3 className="lesson-title">{lesson.lecture_title}</h3>
                      <div className="lesson-meta">
                        <span className="lesson-date">
                          {new Date(lesson.date).toLocaleDateString('ru-RU')}
                        </span>
                        <span className="lesson-duration">{lesson.duration}</span>
                      </div>
                    </div>
                    <div className="lesson-toggle">
                      {expandedLessonId === lesson.id_classes ? '▲' : '▼'}
                    </div>
                  </div>

                  {expandedLessonId === lesson.id_classes && (
                    <div className="lesson-details">
                      <div className="lesson-actions">
                        <button
                          onClick={() => handleEditLecture(lesson)}
                          className="edit-button"
                        >
                          Редактировать
                        </button>
                        <button
                          onClick={() => handleDeleteLecture(lesson.id_classes)}
                          className="delete-button"
                        >
                          Удалить
                        </button>
                      </div>

                      {lesson.description && (
                        <div className="lesson-description">
                          <h4>Описание:</h4>
                          <p>{lesson.description}</p>
                        </div>
                      )}
                      {material?.file_url && (
                        <div className="lesson-material">
                          <h4>Материал:</h4>
                          <a
                            href={material.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="material-link"
                          >
                            {material.title || 'Скачать материал'}
                          </a>
                        </div>
                      )}
                      {lesson.slides && (
                        <div className="lesson-slides">
                          <h4>Слайды:</h4>
                          <a
                            href={lesson.slides}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="slides-link"
                          >
                            Просмотреть слайды
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="no-lessons">Нет доступных лекций для этого курса</p>
        )}
      </div>

      {(showAddModal || showEditModal) && (
        <div className="lesmodal-overlay" onClick={handleCloseModal}>
          <div className="lesmodal-content" onClick={(e) => e.stopPropagation()}>
            <div className="lesmodal-header">
              <h3>{showEditModal ? 'Редактировать лекцию' : 'Добавить новую лекцию'}</h3>
              <button
                onClick={handleCloseModal}
                className="close-button"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="lesson-form">
              <div className="form-group">
                <label htmlFor="lecture-title" className="form-label">
                  Название лекции *
                </label>
                <input
                  id="lecture-title"
                  type="text"
                  name="lecture_title"
                  value={newLecture.lecture_title}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lecture-material" className="form-label">
                  Материал
                </label>
                {materialsLoading ? (
                  <div>Загрузка материалов...</div>
                ) : (
                  <select
                    id="lecture-material"
                    name="id_materials"
                    value={newLecture.id_materials}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="">-- Без материала --</option>
                    {materials.map(material => (
                      <option key={material.id_material} value={material.id_material}>
                        {material.title}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lecture-description" className="form-label">
                  Описание
                </label>
                <textarea
                  id="lecture-description"
                  name="description"
                  value={newLecture.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lecture-duration" className="form-label">
                  Длительность *
                </label>
                <select
                  id="lecture-duration"
                  name="duration"
                  value={newLecture.duration}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="30 минут">30 минут</option>
                  <option value="1 час">1 час</option>
                  <option value="1.5 часа">1.5 часа</option>
                  <option value="2 часа">2 часа</option>
                  <option value="3 часа">3 часа</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="lecture-date" className="form-label">
                  Дата *
                </label>
                <input
                  id="lecture-date"
                  type="date"
                  name="date"
                  value={newLecture.date}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lecture-slides" className="form-label">
                  Ссылка на слайды
                </label>
                <input
                  id="lecture-slides"
                  type="url"
                  name="slides"
                  value={newLecture.slides}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="https://example.com/slides"
                />
              </div>

              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="cancel-button"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={materialsLoading}
                >
                  {showEditModal ? 'Сохранить изменения' : 'Добавить лекцию'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonsListPage;
