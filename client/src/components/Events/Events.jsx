import React from 'react';
import './Events.css'; 
import { Link } from 'react-router-dom';

const EventsSection = () => {
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
  ];

  return (
    <section className="events-section">
      <h2 className="events-title">НАШИ МЕРОПРИЯТИЯ</h2>
      <h3 className="events-subtitle">Лекции и семинары</h3>
      <div className="events-list">
        {events.map((event, index) => (
          <div className="event-card" key={index}>
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
      <div className="more-events">
        <p>Хотите еще?</p>
        <Link to="/events">
        <button className="view-all-button">Просмотреть все события</button>
        </Link>
      </div>
    </section>
  );
};

export default EventsSection;
