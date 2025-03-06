import React from 'react';
import { CheckCircle } from 'lucide-react';

const Features = () => {
  const features = [
    'Специализированные курсы разработаны профессионалами',
    'Включает последние тенденции в информационных технологиях',
    'Обучение по вашему графику, из любой точки мира',
    'Уделяется внимание практическим знаниям и навыкам',
    'Получение официального сертификата по завершении курса'
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-16">
          <div className="w-1/2">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3"
              alt="Student studying"
              className="rounded-lg shadow-xl"
            />
          </div>
          
          <div className="w-1/2">
            <h3 className="text-sm text-gray-600 uppercase mb-2">КТО МЫ ТАКИЕ</h3>
            <h2 className="text-3xl font-bold mb-8">Почему именно Createx?</h2>
            
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <CheckCircle className="text-red-500" size={20} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button className="mt-8 bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600">
              Подробнее о нас
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;