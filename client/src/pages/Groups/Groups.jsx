import React from 'react';
import CourseSelection from '../../components/CourseSelection/CourseSelection';
import GroupsList from '../../components/GroupsList/GroupsList';
import './Groups.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const GroupsPage = () => {
  return (
    <>
    <Header />
    <div className="groups-page">
      <h1>Управление группами</h1>
      <CourseSelection />
      <GroupsList />
    </div>
    <Footer />
    </>
  );
};

export default GroupsPage;