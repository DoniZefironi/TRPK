import React from 'react';
import { Play } from 'lucide-react';

const Hero = () => {
  return (
    <div className="hero min-h-[600px] relative animate-fadeIn">
      <div className="container mx-auto px-4 py-16 flex items-center">
        <div className="w-1/2">
          <button className="flex items-center space-x-2 mb-8 hover:text-red-500 transition-colors duration-200">
            <Play className="text-red-500" size={24} />
            <span>Воспроизвести шоурил</span>
          </button>
          
          <h1 className="text-5xl font-bold mb-8 leading-tight">
            Онлайн-школа информатики и вычислительной техники
          </h1>
          
          <div className="flex space-x-4">
            <button className="btn btn-outline">
              О нас
            </button>
            <button className="btn btn-primary">
              Выбрать курс
            </button>
          </div>
        </div>
        
        <div className="w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="Students learning"
            className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;