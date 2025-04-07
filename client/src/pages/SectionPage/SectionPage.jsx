import React from 'react';
import { useParams } from 'react-router-dom';
import TopicList from '../../components/TopicList/TopicList';

const SectionPage = () => {
  const { sectionType, sectionId } = useParams();
  
  return (
    <div className="section-page">
      <TopicList sectionType={sectionType} sectionId={sectionId} />
    </div>
  );
};

export default SectionPage;