import React from 'react';
import './Courses.css';
import animeImage from '../../img/liz.jpg'; // Путь к изображению
import raccoonImage from '../../img/mat.png';
import plushToyImage from '../../img/iam.png';

const CoursesSection = () => {
  const courses = [
    {
      title: 'Школа информатики',
      price: 100,
      teacher: 'Елизавета',
      image: animeImage,
    },
    {
      title: 'Курс технологий интернет-вещей',
      price: 480,
      teacher: 'Матвей',
      image: raccoonImage,
    },
    {
      title: 'Курс высоких знаний электроники и английского языка',
      price: 200,
      teacher: 'Владислав',
      image: plushToyImage,
    },
  ];

  return (
    <section className="courses-section">
      <div className="section-header">
        <h2 className="section-title">Готовы учиться? Избранные курсы</h2>
        <button className="view-all-button">Посмотреть все курсы</button>
      </div>
      <div className="courses-list">
        {courses.map((course, index) => (
          <div className="course-card" key={index}>
            <img src={course.image} alt={course.title} className="course-image" />
            <h3 className="course-title">{course.title}</h3>
            <p className="course-teacher">Преподаватель: {course.teacher}</p>
            <p className="course-price">${course.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesSection;
