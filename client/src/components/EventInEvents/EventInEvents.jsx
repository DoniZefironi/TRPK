import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchLessons, 
  selectLessonsByCourse, 
  createLesson 
} from '../../store/slice/lectureSlice';
import { 
  fetchMaterials,
  selectAllMaterials
} from '../../store/slice/materialSlice';
import './EventInEvents.css';

const LessonsListPage = () => {
  const [course, setCourse] = useState('electric');
  const [showAddModal, setShowAddModal] = useState(false);
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
  
  const lessons = useSelector(selectLessonsByCourse(course));
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

  const handleCloseModal = () => {
    setShowAddModal(false);
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
      setErrorMessage('Please fill all required fields');
      return;
    }

    try {
      await dispatch(createLesson({ 
        course, 
        lessonData: {
          ...newLecture,
          id_materials: newLecture.id_materials || null
        }
      })).unwrap();
      
      handleCloseModal();
    } catch (err) {
      console.error('Failed to create lecture:', err);
      setErrorMessage(err.message || 'Failed to create the lecture. Please try again.');
    }
  };

  if (lessonsStatus === 'loading') return <div className="lessons-page__loading">Loading...</div>;
  if (lessonsError) return <div className="lessons-page__error">Error: {lessonsError}</div>;

  return (
    <div className="lessons-page">
      <div className="lessons-page__header">
        <h2 className="lessons-page__title">Lessons</h2>
        <div className="lessons-page__controls">
          <div className="lessons-page__course-select">
            <label htmlFor="course-select" className="lessons-page__course-label">
              Select course: 
            </label>
            <select
              id="course-select"
              value={course}
              onChange={handleCourseChange}
              className="lessons-page__select-input"
            >
              <option value="electric">Electric</option>
              <option value="iot">IoT</option>
              <option value="informatics">Informatics</option>
            </select>
          </div>
          <button 
            onClick={handleAddLecture}
            className="lessons-page__add-button"
          >
            Add Lecture
          </button>
        </div>
      </div>

      <div className="lessons-page__list">
        {lessons && lessons.length > 0 ? (
          <ul className="lessons-page__items">
                {sortedLessons.map(lesson => {
              const material = materials.find(m => m.id_material === lesson.id_materials);
              return (
                <li 
                  key={lesson.id_classes} 
                  className={`lessons-page__item ${expandedLessonId === lesson.id_classes ? 'expanded' : ''}`}
                >
                  <div 
                    className="lessons-page__item-summary"
                    onClick={() => toggleLessonDetails(lesson.id_classes)}
                  >
                    <div className="lessons-page__item-main-info">
                      <h3 className="lessons-page__item-title">{lesson.lecture_title}</h3>
                      <div className="lessons-page__item-meta">
                        <span className="lessons-page__item-date">{lesson.date}</span>
                        <span className="lessons-page__item-time">{lesson.duration}</span>
                      </div>
                    </div>
                    <div className="lessons-page__item-toggle">
                      {expandedLessonId === lesson.id_classes ? '▲' : '▼'}
                    </div>
                  </div>

                  {expandedLessonId === lesson.id_classes && (
                    <div className="lessons-page__item-details">
                      {lesson.description && (
                        <div className="lessons-page__item-description">
                          <h4>Description:</h4>
                          <p>{lesson.description}</p>
                        </div>
                      )}
                      {material?.file_url && (
                        <div className="lessons-page__item-material">
                          <h4>Material:</h4>
                          <a 
                            href={material.file_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="lessons-page__item-link"
                          >
                            {material.title || 'Download material'}
                          </a>
                        </div>
                      )}
                      {lesson.slides && (
                        <div className="lessons-page__item-slides">
                          <h4>Slides:</h4>
                          <a 
                            href={lesson.slides} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="lessons-page__item-link"
                          >
                            View slides
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
          <p className="lessons-page__empty">No lessons available for this course</p>
        )}
      </div>

      {showAddModal && (
        <div className="lessons-page__modal">
          <div className="lessons-page__modal-content">
            <div className="lessons-page__modal-header">
              <h3>Add New Lecture</h3>
              <button 
                onClick={handleCloseModal}
                className="lessons-page__modal-close"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="lessons-page__modal-form">
              <div className="lessons-page__form-group">
                <label htmlFor="lecture-title" className="lessons-page__form-label">
                  Lecture Title *
                </label>
                <input
                  id="lecture-title"
                  type="text"
                  name="lecture_title"
                  value={newLecture.lecture_title}
                  onChange={handleInputChange}
                  className="lessons-page__form-input"
                  required
                />
              </div>

              <div className="lessons-page__form-group">
                <label htmlFor="lecture-material" className="lessons-page__form-label">
                  Material
                </label>
                {materialsLoading ? (
                  <div>Loading materials...</div>
                ) : (
                  <select
                    id="lecture-material"
                    name="id_materials"
                    value={newLecture.id_materials}
                    onChange={handleInputChange}
                    className="lessons-page__form-input"
                  >
                    <option value="">-- No material --</option>
                    {materials.map(material => (
                      <option key={material.id_material} value={material.id_material}>
                        {material.title}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="lessons-page__form-group">
                <label htmlFor="lecture-description" className="lessons-page__form-label">
                  Description
                </label>
                <textarea
                  id="lecture-description"
                  name="description"
                  value={newLecture.description}
                  onChange={handleInputChange}
                  className="lessons-page__form-textarea"
                  rows="4"
                />
              </div>

              <div className="lessons-page__form-group">
                <label htmlFor="lecture-duration" className="lessons-page__form-label">
                  Duration *
                </label>
                <select
                  id="lecture-duration"
                  name="duration"
                  value={newLecture.duration}
                  onChange={handleInputChange}
                  className="lessons-page__form-input"
                  required
                >
                  <option value="30 минут">30 минут</option>
                  <option value="1 час">1 час</option>
                  <option value="1.5 часа">1.5 часа</option>
                  <option value="2 часа">2 часа</option>
                  <option value="3 часа">3 часа</option>
                </select>
              </div>

              <div className="lessons-page__form-group">
                <label htmlFor="lecture-date" className="lessons-page__form-label">
                  Date *
                </label>
                <input
                  id="lecture-date"
                  type="date"
                  name="date"
                  value={newLecture.date}
                  onChange={handleInputChange}
                  className="lessons-page__form-input"
                  required
                />
              </div>

              <div className="lessons-page__form-group">
                <label htmlFor="lecture-slides" className="lessons-page__form-label">
                  Slides URL
                </label>
                <input
                  id="lecture-slides"
                  type="url"
                  name="slides"
                  value={newLecture.slides}
                  onChange={handleInputChange}
                  className="lessons-page__form-input"
                  placeholder="https://example.com/slides"
                />
              </div>

              {errorMessage && (
                <div className="lessons-page__error-message">{errorMessage}</div>
              )}

              <div className="lessons-page__form-actions">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="lessons-page__cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="lessons-page__submit-button"
                  disabled={materialsLoading}
                >
                  Add Lecture
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