import React from 'react';
import SectionForm from '../../components/SectionForm/SectionForm';
import SectionList from '../../components/SectionList/SectionList';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import './Section.css'

const Section = () => {
  return (
    <div className='sectionmain'>
      <Header />
      <SectionForm />
      <SectionList />
      <Footer />
    </div>
  );
};

export default Section;
