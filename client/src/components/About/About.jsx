import React from 'react';
import './About.css'; 
import illustration from 'path/to/illustration.png'; 

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2 className="about-title">КТО МЫ ТАКИЕ</h2>
        <h3 className="about-subtitle">Почему именно Createx?</h3>
        <ul className="about-list">
          <li>Специализированные курсы разработаны профессионалами.</li>
          <li>Включает последние тенденции в информационных технологиях.</li>
          <li>Обучение по вашему графику, из любой точки мира.</li>
          <li>Уделяется внимание практическим знаниям и навыкам.</li>
          <li>Получение официального сертификата по завершению курса.</li>
        </ul>
        <button className="about-button">Подробнее о нас</button>
      </div>
      <div className="about-image">
        <img src={illustration} alt="Человек с ноутбуком" />
      </div>
    </section>
  );
};

export default AboutSection;
