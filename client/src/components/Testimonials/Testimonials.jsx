import React from 'react';
import './Testimonials.css';
import leftArrow from '../../img/prev-btn.png'; // Путь к значку левой стрелки
import rightArrow from '../../img/next.png'; // Путь к значку правой стрелки
import userImage from '../../img/photo.png'; // Путь к изображению пользователя

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">Отзывы</h2>
      <h3 className="testimonials-subtitle">Что говорят наши студенты</h3>
      <div className="testimonial-card">
        <button className="arrow-button left-arrow">
          <img src={leftArrow} alt="Предыдущий отзыв" />
        </button>
        <div className="testimonial-content">
          <p className="testimonial-text">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo."
          </p>
          <div className="testimonial-user">
            <img src={userImage} alt="Eleanor Pena" className="user-image" />
            <div className="user-info">
              <h4 className="user-name">Eleanor Pena</h4>
              <p className="user-position">Позиция, Курс</p>
            </div>
          </div>
        </div>
        <button className="arrow-button right-arrow">
          <img src={rightArrow} alt="Следующий отзыв" />
        </button>
      </div>
    </section>
  );
};

export default TestimonialsSection;
