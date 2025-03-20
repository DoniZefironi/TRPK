import React from 'react';
import './CertificationInCourse.css';
import certificateImage from '../../img/certificate.png'; 
import delmarLogo from '../../img/del.png'; 
import sentinalLogo from '../../img/sentinal.png';
import nationalLogo from '../../img/national.png';

const CertificationTeamSection = () => {
  return (
    <section className="certification-team-section">
      <div className="certification-section">
        <div className='cert'>
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
        </div>
        <div className="certificate-image">
          <img src={certificateImage} alt="Сертификат" />
        </div>
      </div>
    </section>
  );
};

export default CertificationTeamSection;
