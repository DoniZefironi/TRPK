import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchTopicsBySection } from '../../store/slice/forumSlice';

const TopicList = () => {
  const dispatch = useDispatch();
  const { sectionType, sectionId } = useParams();
  const { topics, isLoading, error } = useSelector(state => state.forum);

  useEffect(() => {
    dispatch(fetchTopicsBySection({ sectionType, sectionId }));
  }, [dispatch, sectionType, sectionId]);

  if (isLoading) return <div>Loading topics...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="topic-list">
      <h1>Темы раздела</h1>
      <Link to={`/forum/${sectionType}/${sectionId}/create-topic`} className="btn">
        Создать новую тему
      </Link>
      
      <div className="topics">
        {topics.map(topic => (
          <div key={topic.id_topic} className="topic-card">
            <h3>
              <Link to={`/forum/topics/${topic.id_topic}`}>{topic.title}</Link>
            </h3>
            <p>Автор: {topic.User?.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicList;