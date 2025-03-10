import React from 'react';
import CourseCard from './CourseCard';

const Courses = () => {
  const courses = [
    {
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
      category: 'Информатика',
      title: 'Школа информатики',
      price: 100,
      author: 'Елизаветы'
    },
    {
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      category: 'IoT',
      title: 'Курс технологий интернет-вещей',
      price: 480,
      author: 'Матвея'
    },
    {
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
      category: 'Электроника и Английский язык',
      title: 'Кукс высоких знания электроники и английского языка',
      price: 200,
      author: 'Владислава'
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-sm text-gray-600 uppercase mb-2">ГОТОВЫ УЧИТЬСЯ?</h3>
            <h2 className="text-3xl font-bold">Избранные курсы</h2>
          </div>
          <button className="text-red-500 hover:text-red-600 font-medium">
            Посмотреть все курсы
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;