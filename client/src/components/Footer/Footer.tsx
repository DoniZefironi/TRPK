import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              CREATE<span className="text-red-500">X</span>
            </h2>
            <div className="flex space-x-4 mt-4">
              <Facebook className="hover:text-red-500 cursor-pointer" />
              <Twitter className="hover:text-red-500 cursor-pointer" />
              <Instagram className="hover:text-red-500 cursor-pointer" />
              <Linkedin className="hover:text-red-500 cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Сайт</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-red-500">О нас</a></li>
              <li><a href="/courses" className="hover:text-red-500">Курсы</a></li>
              <li><a href="/events" className="hover:text-red-500">События</a></li>
              <li><a href="/blog" className="hover:text-red-500">Блог</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li>contact@createx.com</li>
              <li>(405) 555-0128</li>
              <li>2464 Royal Ln. Mesa, New Jersey 45463</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Подписка</h3>
            <p className="mb-4">Подпишитесь на наши новости и обновления</p>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 CreateX. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;