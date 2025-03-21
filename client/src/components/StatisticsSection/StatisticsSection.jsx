import React from 'react';
import './StatisticsSection.css'; // Подключение стилей
import illustration from '../../img/aboutnote.png'; // Путь к вашему изображению

const StatisticsSection = () => {
  return (
    <section className="statistics-section">
              <div className="statistics-image">
        <img src={illustration} alt="Человек за ноутбуком" />
      </div>
      <div className="statistics-content">
        <div className="statistics-metrics">
          <p><strong>1200</strong> студентов закончили</p>
          <p><strong>84</strong> завершенные курсы</p>
          <p><strong>16</strong> квалифицированные репетиторы</p>
          <p><strong>5</strong> лет опыта</p>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
