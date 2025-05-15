import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import ElectiveDetailsPage from '../../components/ElectiveDetails/ElectiveDetails';

const ElectiveDetailsPages = () => {
  return (
    <div>
      <Header />
      <ElectiveDetailsPage />
      <Footer />
    </div>
  );
};

export default ElectiveDetailsPages;
