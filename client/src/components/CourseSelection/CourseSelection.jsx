import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCourse } from '../../store/slice/groupSlice';
import './CourseSelection.css'; // Исправлено расширение файла

const CourseSelection = () => {
  const dispatch = useDispatch();
  const { courses, currentCourse } = useSelector(state => state.groups);

  const handleSelectCourse = (course) => {
    // Приводим курс к нижнему регистру для единообразия
    const normalizedCourse = course.toLowerCase();
    dispatch(setCurrentCourse(normalizedCourse));
  };

  return (
    <div className="course-selection">
      <h2>Выберите курс</h2>
      <div className="course-buttons">
        {courses.map(course => (
          <button
            key={course}
            className={`course-btn ${currentCourse === course.toLowerCase() ? 'active' : ''}`}
            onClick={() => handleSelectCourse(course)}
          >
            {course.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseSelection;