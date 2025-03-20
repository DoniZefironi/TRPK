import React from 'react';
import './About.css'; 
import illustration from '../../img/woman.png'; 
import accept from '../../img/check.png'

const AboutSection = () => {
  return (
    <section className="about-section">
            <div className="about-image">
        <img src={illustration} alt="Человек с ноутбуком" />
      </div>
      <div className="about-content">
        <h2 className="about-title">КТО МЫ ТАКИЕ</h2>
        <h3 className="about-subtitle">Почему именно Createx?</h3>
        <ul className="about-list">
          <li><img src={accept} alt="Галочка" className='check'/>Специализированные курсы разработаны профессионалами.</li>
          <li><img src={accept} alt="Галочка" className='check'/>Включает последние тенденции в информационных технологиях.</li>
          <li><img src={accept} alt="Галочка" className='check'/>Обучение по вашему графику, из любой точки мира.</li>
          <li><img src={accept} alt="Галочка" className='check'/>Уделяется внимание практическим знаниям и навыкам.</li>
          <li><img src={accept} alt="Галочка" className='check'/>Получение официального сертификата по завершению курса.</li>
        </ul>
        <button className="about-button">Подробнее о нас</button>
      </div>
    </section>
  );
};

export default AboutSection;
