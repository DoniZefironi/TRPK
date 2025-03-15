import React from 'react';
import './AdvantagesSection.css';
import tutorIcon from 'path/to/tutor-icon.png'; // Замените на путь к значкам
import feedbackIcon from 'path/to/feedback-icon.png';
import libraryIcon from 'path/to/library-icon.png';
import communityIcon from 'path/to/community-icon.png';
import illustration from 'path/to/illustration.png';

const AdvantagesSection = () => {
  return (
    <section className="advantages-section">
      <div className="advantages-content">
        <h2 className="advantages-title">НАШИ ПРЕИМУЩЕСТВА</h2>
        <h3 className="advantages-subtitle">Вот как мы это делаем.</h3>
        <div className="advantages-icons">
          <div className="advantage">
            <img src={tutorIcon} alt="Опытные репетиторы" />
            <p>Опытные репетиторы</p>
          </div>
          <div className="advantage">
            <img src={feedbackIcon} alt="Обратная связь и поддержка" />
            <p>Обратная связь и поддержка</p>
          </div>
          <div className="advantage">
            <img src={libraryIcon} alt="Круглосуточная онлайн-библиотека" />
            <p>Круглосуточная онлайн-библиотека</p>
          </div>
          <div className="advantage">
            <img src={communityIcon} alt="Сообщество" />
            <p>Сообщество</p>
          </div>
        </div>
        <div className="tutors-section">
          <h3 className="tutors-title">Только практикующие репетиторы</h3>
          <p className="tutors-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id sem nec tortor semper tincidunt.
          </p>
        </div>
      </div>
      <div className="advantages-illustration">
        <img src={illustration} alt="Онлайн-обучение с преподавателем" />
      </div>
    </section>
  );
};

export default AdvantagesSection;
