import React from 'react';
import './Subscription.css';
import leftIllustration from '../../img/left.png'; // Путь к левой иллюстрации
import rightIllustration from '../../img/right.png'; // Путь к правой иллюстрации

const SubscriptionSection = () => {
  return (
    <section className="subscription-section">
      <div className="illustration-container left">
        <img src={leftIllustration} alt="Левая иллюстрация" />
      </div>
      <div className="subscription-content">
        <h2 className="subscription-title">НИЧЕГО НЕ ПРОПУСТИТЕ</h2>
        <h3 className="subscription-subtitle">
          Подпишитесь на объявления Createx School
        </h3>
        <div className="subscription-form">
          <input
            type="email"
            placeholder="Ваш рабочий адрес электронной почты"
            className="email-input"
          />
          <button className="subscribe-button">Подписаться</button>
        </div>
      </div>
      <div className="illustration-container right">
        <img src={rightIllustration} alt="Правая иллюстрация" />
      </div>
    </section>
  );
};

export default SubscriptionSection;
