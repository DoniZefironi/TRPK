import React from 'react';
import './Advantages.css';
import tutorIcon from '../../img/Star.png'; 
import feedbackIcon from '../../img/like.png';
import libraryIcon from '../../img/Layouts.png';
import communityIcon from '../../img/Chat.png';
import illustration from '../../img/illustration1.png';

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
        <div className='img-text'>
        <div className="tutors-section">
          <h3 className="tutors-title">Только практикующие репетиторы</h3>
          <p className="tutors-description">
          Urna nisi, arcu cras nunc. Aenean quam est lobortis mi non fames dictum suspendisse. Morbi mauris cras massa ut dolor quis sociis mollis augue. Nunc, sodales tortor sit diam mi amet massa. Fermentum diam diam sociis vestibulum. Nulla nisl accumsan, id dignissim massa ut amet. Amet enim, nisi tempus vehicula.
          </p>
        </div>
        <div className="advantages-illustration">
        <img src={illustration} alt="Онлайн-обучение с преподавателем" />
      </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
