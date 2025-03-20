import React, { useState } from 'react';
import './EventInEvents.css';

const EventsControlSection = () => {
  const [category, setCategory] = useState('все темы');
  const [sortBy, setSortBy] = useState('новейший');
  const [showCount, setShowCount] = useState('9');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log(`Поиск: ${e.target.value}`);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    console.log(`Выбранная категория: ${e.target.value}`);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    console.log(`Сортировка по: ${e.target.value}`);
  };

  const handleShowCountChange = (e) => {
    setShowCount(e.target.value);
    console.log(`Показывать: ${e.target.value}`);
  };
const events = [
    {
      date: '05/08',
      time: '11:00 - 14:00',
      title: 'Основы Электроники: Путь к Цифровому Миру',
      description: 'Онлайн-мастер-класс',
    },
    {
      date: '24/07',
      time: '11:00 - 12:30',
      title: 'Электроника Завтра: Технологии Будущего',
      description: 'Онлайн-лекция',
    },
    {
      date: '16/07',
      time: '10:00 - 13:00',
      title: 'English for Business: Enhancing Professional Communication',
      description: 'Онлайн-лекция',
    },
    {
        date: '05/08',
        time: '11:00 - 14:00',
        title: 'Основы Электроники: Путь к Цифровому Миру',
        description: 'Онлайн-мастер-класс',
      },
      {
        date: '24/07',
        time: '11:00 - 12:30',
        title: 'Электроника Завтра: Технологии Будущего',
        description: 'Онлайн-лекция',
      },
      {
        date: '05/08',
        time: '11:00 - 14:00',
        title: 'Основы Электроники: Путь к Цифровому Миру',
        description: 'Онлайн-мастер-класс',
      },
  ];
  return (
    <section className="events-control-section">
        <div className='filt'>
            <h2>Наши мероприятия</h2>
            <h1>Лекции, семинары и мастер-классы</h1>
        <div className="filters">
        <select value={category} onChange={handleCategoryChange}>
          <option value="все темы">Все темы</option>
          <option value="лекции">Лекции</option>
          <option value="семинары">Семинары</option>
          <option value="мастер-классы">Мастер-классы</option>
        </select>

        <select value={sortBy} onChange={handleSortChange}>
          <option value="новейший">Новейший</option>
          <option value="старейший">Старейший</option>
        </select>

        <select value={showCount} onChange={handleShowCountChange}>
          <option value="9">9</option>
          <option value="12">12</option>
          <option value="15">15</option>
        </select>

        <input
          type="text"
          placeholder="Поиск события..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
        </div>
        <div className="events-list1">
        {events.map((event, index) => (
          <div className="event-card1" key={index}>
            <div className='row-event'>
            <div>
            <p className="event-date">{event.date}</p>
            <p className="event-time">{event.time}</p>
            </div>
            <div>
            <h4 className="event-title">{event.title}</h4>
            <p className="event-description">{event.description}</p>
            </div>
            </div>
            <button className="event-button">Посмотреть больше</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsControlSection;
