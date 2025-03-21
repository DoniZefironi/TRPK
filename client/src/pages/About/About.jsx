import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Certification from '../../components/Certification/Certification'
import AboutSection from '../../components/AboutSection/AboutSection';
import StatisticsSection from '../../components/StatisticsSection/StatisticsSection';
import CoreValuesSection from '../../components/CoreValuesSection/CoreValuesSection';
import MainDirectionsSection from '../../components/MainDirectionsSection/MainDirectionsSection';
import SubscriptionSection from '../../components/Subscription/Subscription';
import TestimonialsSection from '../../components/Testimonials/Testimonials';
import LearningStepsSection from '../../components/LearningStepsSection/LearningStepsSection';


const About = () => {
    return (
        <>
            <Header />
            <AboutSection />
            <StatisticsSection />
            <CoreValuesSection />
            <MainDirectionsSection />
            <LearningStepsSection />
            <Certification />
            <TestimonialsSection />
            <SubscriptionSection />
            <Footer />
        </>
          );
        };
        
export default About;