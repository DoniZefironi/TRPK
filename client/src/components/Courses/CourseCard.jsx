import React from 'react';

const CourseCard = ({ image, category, title, price, author }) => {
  return (
    <div className="course-card bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-300" 
        />
      </div>
      <div className="p-4">
        <span className="inline-block px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800 mb-2">
          {category}
        </span>
        <h3 className="text-xl font-semibold mb-4 hover:text-red-500 transition-colors duration-200">
          {title}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-red-500 font-bold text-lg">${price}</span>
          <span className="text-gray-600">от {author}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;