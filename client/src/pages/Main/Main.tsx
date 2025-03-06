import React from 'react';
import Hero from '../../components/Hero/Hero.tsx';
import Features from '../../components/Features/Features.tsx';
import Courses from '../../components/Courses/Courses.tsx';
import Events from '../../components/Events/Events.tsx';

const Main = () => {
    return (
        <>
            <Hero />
          <Features />
          <Courses />
          <Events />
        </>
          );
        };
        
export default Main;