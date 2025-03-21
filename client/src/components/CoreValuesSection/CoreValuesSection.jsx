import React from 'react';
import './CoreValuesSection.css'; // Подключение файла со стилями
import structureIcon from '../../img/ic-structure.png'; // Путь к иконкам
import reviewsIcon from '../../img/ic-chat.png';
import efficiencyIcon from '../../img/ic-target.png';
import scheduleIcon from '../../img/ic-structure.png';

const CoreValuesSection = () => {
  const values = [
    {
      icon: structureIcon,
      title: 'Структурированный подход',
      description: 'Aenean urna dictum adipiscing nec, cras quisque. Nunc in mauris.',
    },
    {
      icon: reviewsIcon,
      title: 'Профессиональные отзывы',
      description: 'Culpa nostrud commodo ea consequat reprehenderit aliquip.',
    },
    {
      icon: efficiencyIcon,
      title: 'Эффективность',
      description: 'Viverra scelerisque consequat net. Adipisicing esse consequat.',
    },
    {
      icon: scheduleIcon,
      title: 'Гибкий график',
      description: 'Aute eiusmod dolore dolore deserunt veniam ad deserunt.',
    },
  ];

  return (
    <section className="core-values-section">
      <h2 className="section-title">Наши основные ценности</h2>
      <div className="values-list">
        {values.map((value, index) => (
          <div className="value-card" key={index}>
            <img src={value.icon} alt={value.title} className="value-icon" />
            <h3 className="value-title">{value.title}</h3>
            <p className="value-description">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValuesSection;
