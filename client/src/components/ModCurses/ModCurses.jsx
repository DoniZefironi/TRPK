import React from 'react';
import './ModCurses.css';
import animeImage from '../../img/liz.jpg'; 
import raccoonImage from '../../img/mat.png';
import plushToyImage from '../../img/iam.png';

const CoursesSection = () => {
  const courses = [
    {
      title: 'Школа информатики',
      block: 'Информатика',
      price: 100,
      teacher: 'Елизаветы',
      image: animeImage,
    },
    {
      title: 'Курс технологий интернет-вещей',
      block: 'IoT',
      price: 480,
      teacher: 'Матвея',
      image: raccoonImage,
    },
    {
      title: 'Курс высоких знаний электроники и английского языка',
      block: 'Электроника и Английский язык',
      price: 200,
      teacher: 'Владислава',
      image: plushToyImage,
    },
  ];

  return (
    <section className="courses-section">
      <h2 className="section-title">Приятной учебы!</h2>
      <div className="section-header">
        <h2 className="section-title2">Наши онлайн-курсы</h2>
      </div>
      <div className="courses-list">
        {courses.map((course, index) => (
          <div className="course-card" key={index}>
            <img src={course.image} alt={course.title} className="course-image" />
            <div className='block'><h3 className="course-block">{course.block}</h3></div>
            <h3 className="course-title">{course.title}</h3>
            <div className='row-price'>
            <p className="course-price">${course.price}</p>
            <p> | </p>
            <p className="course-teacher">от {course.teacher}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesSection;
