import React from 'react';
import './MainDirectionsSection.css'; // Подключение стилей
import informaticsImage from '../../img/informatic.png'; // Путь к изображению Информатики
import electronicsImage from '../../img/electronica.png'; // Путь к изображению Электроники
import iotImage from '../../img/IoT.png'; // Путь к изображению IoT

const MainDirectionsSection = () => {
  const directions = [
    {
      title: 'Информатика',
      description: 'Odio posuere netus quisque faucibus lectus arcu donec. Eget dictum eu viverra faucibus. Viverra scelerisque consequat.',
      image: informaticsImage,
    },
    {
      title: 'Электроника',
      description: 'Odio posuere netus quisque faucibus lectus arcu donec. Eget dictum eu viverra faucibus. Viverra scelerisque consequat.',
      image: electronicsImage,
    },
    {
      title: 'IoT (Интернет вещей)',
      description: 'Odio posuere netus quisque faucibus lectus arcu donec. Eget dictum eu viverra faucibus. Viverra scelerisque consequat.',
      image: iotImage,
    },
  ];

  return (
    <section className="main-directions-section">
      <h2 className="section-title">НАШИ ОСНОВНЫЕ НАПРАВЛЕНИЯ</h2>
      <h3 className="section-subtitle">Чему мы учим?</h3>
      <div className="directions-list">
        {directions.map((direction, index) => (
          <div className="direction-card" key={index}>
            <img src={direction.image} alt={direction.title} className="direction-image" />
            <h4 className="direction-title">{direction.title}</h4>
            <p className="direction-description">{direction.description}</p>
            <button className="direction-button">Проверить курсы</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainDirectionsSection;
