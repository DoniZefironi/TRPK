import React from 'react';
import { Calendar } from 'lucide-react';

const Events = () => {
  const events = [
    {
      date: { day: '05', month: 'August' },
      time: '11:00 - 14:00',
      title: 'Основы Электроники: Путь к Цифровому Миру',
      type: 'Онлайн мастер-класс'
    },
    {
      date: { day: '24', month: 'July' },
      time: '11:00 - 12:30',
      title: 'Электроника Завтра: Технологии Будущего',
      type: 'Онлайн лекция'
    },
    {
      date: { day: '16', month: 'July' },
      time: '10:00 - 13:00',
      title: 'English for Business: Enhancing Professional Communication',
      type: 'Online lecture'
    }
  ];

  return (
    <div className="py-16 bg-[#FFE6E6]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fadeIn">
          <h3 className="section-subtitle">НАШИ МЕРОПРИЯТИЯ</h3>
          <h2 className="section-title">Лекции и семинары</h2>
        </div>
        
        <div className="space-y-4">
          {events.map((event, index) => (
            <div 
              key={index} 
              className="event-card bg-white rounded-lg p-6 flex items-center justify-between"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">{event.date.day}</div>
                  <div className="text-gray-600">{event.date.month}</div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 hover:text-red-500 transition-colors duration-200">
                    {event.title}
                  </h3>
                  <div className="text-gray-600 flex items-center">
                    <Calendar size={16} className="mr-2" />
                    {event.time} | {event.type}
                  </div>
                </div>
              </div>
              
              <button className="btn border-2 border-red-500 text-red-500 hover:bg-red-50 transition-colors duration-200">
                Посмотреть больше
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 animate-fadeIn">
          <h3 className="text-2xl font-semibold mb-4">Хотите еще?</h3>
          <button className="btn btn-primary">
            Просмотреть все события
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;