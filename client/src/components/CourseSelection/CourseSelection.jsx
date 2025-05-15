import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCourse } from '../../store/slice/groupSlice';
import './CourseSelection.css';

const CourseSelection = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector(state => state.groups);

  const [selectedCourse, setSelectedCourse] = useState('');
  const [allowedCourse, setAllowedCourse] = useState(''); // курс из permissions

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userObj = JSON.parse(storedUser);
        if (userObj.permissions) {
          const perm = userObj.permissions.toLowerCase();
          setAllowedCourse(perm);
          setSelectedCourse(perm);
          dispatch(setCurrentCourse(perm));
          return;
        }
      }
    } catch (e) {
      console.warn('Ошибка при чтении localStorage:', e);
    }
    // fallback если не нашли permissions — блокируем все
    setAllowedCourse('');
  }, [dispatch]);

  const handleSelectCourse = (course) => {
    const normalizedCourse = course.toLowerCase();
    if (normalizedCourse === allowedCourse) {
      setSelectedCourse(normalizedCourse);
      dispatch(setCurrentCourse(normalizedCourse));
    }
  };

  return (
    <div className="course-selection">
      <h2>Выберите курс</h2>
      <div className="course-buttons">
        {courses.map(course => {
          const courseLower = course.toLowerCase();
          return (
            <button
              key={course}
              className={`course-btn ${selectedCourse === courseLower ? 'active' : ''}`}
              onClick={() => handleSelectCourse(course)}
              disabled={courseLower !== allowedCourse}
              title={courseLower !== allowedCourse ? 'Вы можете выбрать только ваш курс' : ''}
            >
              {course.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CourseSelection;
