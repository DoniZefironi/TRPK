import React from 'react';
import ModCurses from '../../components/ModCurses/ModCurses'
import TestimonialsSection from '../../components/Testimonials/Testimonials';
import SubscriptionSection from '../../components/Subscription/Subscription';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import CertificationTeamSection from '../../components/CertificationInCourse/CertificationInCourse';


const Curses = () => {
    return (
        <>
            <Header />
            <ModCurses />
            <TestimonialsSection />
            <CertificationTeamSection />
            <SubscriptionSection />
            <Footer />
        </>
          );
        };
        
export default Curses;