import React from 'react';
import './LearningStepsSection.css'; // Подключение стилей
import illustration from '../../img/illustrationsection.png'; // Путь к изображению

const LearningStepsSection = () => {
  const steps = [
    {
      title: 'Просмотр онлайн-видеолекций',
      description: 'Aliquam turpis viverra quam sit interdum blandit posuere pellentesque. Nisl, imperdiet gravida massa neque.',
    },
    {
      title: 'Прохождение теста',
      description: 'Facilisis pellentesque quis accumsan ultricies. Eu egestas eget feugiat lacus, amet, sollicitudin egestas laoreet etiam.',
    },
    {
      title: 'Отзыв куратора',
      description: 'Eget amet, enim pharetra leo egestas nisi, odio imperdiet facilisis. Aliquet orci varius volutpat egestas facilisi lobortis.',
    },
    {
      title: 'Исправления при необходимости',
      description: 'Non tempor pulvinar tincidunt aliquam. Placerat ultricies malesuada dui auctor.',
    },
  ];

  return (
    <section className="learning-steps-section">
      <div className="steps-content">
        {steps.map((step, index) => (
          <div className="step" key={index}>
            <h3 className="step-title">{`${index + 1}. ${step.title}`}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="steps-illustration">
        <img src={illustration} alt="Выпускник с дипломом" />
      </div>
    </section>
  );
};

export default LearningStepsSection;
