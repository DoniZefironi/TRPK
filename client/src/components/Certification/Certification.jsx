import React from 'react';
import './Certification.css';
import certificateImage from '../../img/certificate.png'; // Путь к изображению сертификата
import delmarLogo from '../../img/del.png'; // Путь к логотипам
import sentinalLogo from '../../img/sentinal.png';
import nationalLogo from '../../img/national.png';
import tutor1Image from '../../img/liz.jpg'; // Путь к фотографиям репетиторов
import tutor2Image from '../../img/mat.png';
import tutor3Image from '../../img/iam.png';

const CertificationTeamSection = () => {
  return (
    <section className="certification-team-section">
      {/* Секция сертификатов */}
      <div className="certification-section">
        <h2 className="certification-title">СЕРТИФИКАТ CREATEX</h2>
        <h3 className="certification-subtitle">Ваша экспертиза будет подтверждена</h3>
        <p className="certification-text">
          Мы аккредитованы международными профессиональными организациями и институтами:
        </p>
        <div className="certification-logos">
          <img src={delmarLogo} alt="Del Mar Strategy" />
          <img src={sentinalLogo} alt="Sentinal Consulting" />
          <img src={nationalLogo} alt="National" />
        </div>
        <div className="certificate-image">
          <img src={certificateImage} alt="Сертификат" />
        </div>
      </div>

      {/* Секция команды репетиторов */}
      <div className="team-section">
        <h2 className="team-title">ЛУЧШИЕ РЕПЕТИТОРЫ ВСЕ ЗДЕСЬ</h2>
        <h3 className="team-subtitle">Познакомьтесь с нашей командой</h3>
        <div className="tutors-list">
          <div className="tutor-card">
            <img src={tutor1Image} alt="Хузидзе Елизавета" />
            <h4 className="tutor-name">Хузидзе Елизавета</h4>
            <p className="tutor-description">
              Докторант в области Компьютерной Логики и Системного Программирования, Инструктор
            </p>
          </div>
          <div className="tutor-card">
            <img src={tutor2Image} alt="Шаблинский Матвей" />
            <h4 className="tutor-name">Шаблинский Матвей</h4>
            <p className="tutor-description">
              Исследователь по Интернету вещей (IoT) и Компьютерным Технологиям, Преподаватель
            </p>
          </div>
          <div className="tutor-card">
            <img src={tutor3Image} alt="Шаболда Владислав" />
            <h4 className="tutor-name">Шаболда Владислав</h4>
            <p className="tutor-description">
              Эксперт по Электронике и Инновационным Технологиям, Преподаватель
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationTeamSection;
