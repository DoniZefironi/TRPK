import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Events from '../../components/EventInEvents/EventInEvents'
import SubscriptionSection from '../../components/Subscription/Subscription'

const Curses = () => {
    return (
        <>
            <Header />
            <Events />
            <SubscriptionSection />
            <Footer />
        </>
          );
        };
        
export default Curses;