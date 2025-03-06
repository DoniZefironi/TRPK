import React from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold flex items-center">
          CREATE<span className="text-red-500">X</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/about" className="text-gray-700 hover:text-gray-900">О нас</Link>
          <Link to="/courses" className="text-gray-700 hover:text-gray-900">Курсы</Link>
          <Link to="/events" className="text-gray-700 hover:text-gray-900">События</Link>
          <Link to="/blog" className="text-gray-700 hover:text-gray-900">Блог</Link>
          <Link to="/contacts" className="text-gray-700 hover:text-gray-900">Контакты</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Получить консультацию
          </button>
          <Link to="/login" className="text-gray-700 hover:text-gray-900">
            Войти / Зарегистрироваться
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;