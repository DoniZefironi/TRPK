import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getTopicsBySection } from '../../store/slice/forumSlice';

const TopicList = () => {
  const dispatch = useDispatch();
  const { sectionType, sectionId } = useParams();
  const { topics, isLoading, error } = useSelector(state => state.forum);

  useEffect(() => {
    dispatch(getTopicsBySection({ sectionType, sectionId }));
  }, [dispatch, sectionType, sectionId]);

  if (isLoading) return <div>Загрузка тем...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="topic-list">
      <h1>Темы раздела: {sectionType.toUpperCase()}</h1>

      {/* Кнопка для создания новой темы */}
      <Link to={`/forum/${sectionType}/${sectionId}/create-topic`} className="btn create-topic-btn">
        Создать новую тему
      </Link>
      
      <div className="topics">
        {topics.length ? (
          topics.map(topic => (
            <div key={topic.id_topic} className="topic-card">
              <h3>
                <Link to={`/forum/topics/${topic.id_topic}`}>{topic.title}</Link>
              </h3>
              <p>Автор: {topic.User?.username}</p>
            </div>
          ))
        ) : (
          <p>Тем пока нет. Будьте первым, кто создаст тему!</p>
        )}
      </div>
    </div>
  );
};

export default TopicList;
