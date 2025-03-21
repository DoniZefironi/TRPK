import React from 'react';
import './AboutSection.css'; 
import illustration from '../../img/illustrationabot.png'; 

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-text">
        <h2 className="section-title">О НАС</h2>
        <h1 className="about-heading">Онлайн-школа Createx</h1>
        <p className="about-description">
          Createx Online School — лидер в сфере онлайн-обучения. У нас множество курсов и программ от ведущих экспертов рынка.
        </p>
        <p className="about-description">
          Мы предоставляем актуальные подходы к онлайн-обучению, стажировкам и трудоустройству в крупнейших компаниях страны. Наши образовательные программы помогут вам получить новую специальность с нуля. Во время учебы мы поможем вам найти работу. Ознакомьтесь с курсами и онлайн-мероприятиями, которые мы организуем.
        </p>
        <div className="about-buttons">
          <button className="explore-events-btn">Исследуйте события</button>
          <button className="view-courses-btn">Просмотр курсов</button>
        </div>
      </div>
      <div className="about-image1">
        <img src={illustration} alt="Иллюстрация человека за компьютером" />
      </div>
    </section>
  );
};

export default AboutSection;
