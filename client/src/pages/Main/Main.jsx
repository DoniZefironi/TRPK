import React from 'react';
import Land from '../../components/Land/Land';
import About from '../../components/About/About';
import Certificate from '../../components/Certification/Certification';
import Course from '../../components/Courses/Courses';
import Events from '../../components/Events/Events'
import AdvantagesSection from '../../components/Advantages/Advantages';
import TestimonialsSection from '../../components/Testimonials/Testimonials';
import SubscriptionSection from '../../components/Subscription/Subscription';
import Footer from '../../components/Footer/Footer';


const Main = () => {
    return (
        <>
            <Land />
            <About />
            <Course />
            <AdvantagesSection />
            <Events />
            <Certificate />
            <TestimonialsSection />
            <SubscriptionSection />
            <Footer />
        </>
          );
        };
        
export default Main;