import React from 'react';
import { useParams } from 'react-router-dom';
import TopicDetail from '../../components/TopicDetail/TopicDetail';

const TopicPage = () => {
  const { id } = useParams();
  
  return (
    <div className="topic-page">
      <TopicDetail topicId={id} />
    </div>
  );
};

export default TopicPage;