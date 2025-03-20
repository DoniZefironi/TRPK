import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import ContactSection from '../../components/ContactSectionTop/ContactSectionTop';
import ContactFormSection from '../../components/ContactFormSection/ContactForm';


const Contacts = () => {
    return (
        <>
            <Header />
            <ContactSection />
            <ContactFormSection/>
            <Footer />
        </>
          );
        };
        
export default Contacts;