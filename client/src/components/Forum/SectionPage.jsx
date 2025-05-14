import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSections, createTopic } from '../../store/slice/forumSlice';
import { Link, useParams } from 'react-router-dom';
import CreateTopicModal from './CreateTopicModal';
import './ForumSectionPage.css';

const SectionPage = () => {
  const { sectionId } = useParams();
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  const { sections, status, error } = useSelector((state) => state.forum);

  useEffect(() => {
    if (sectionId) {
      dispatch(fetchSections());
    }
  }, [dispatch, sectionId]); // ✅ Добавили зависимость от sectionId

  const section = sections.find(s => s.id === parseInt(sectionId));

  const handleCreateTopic = (topicData) => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      console.error('Ошибка: Пользователь не найден в localStorage');
      return;
    }

    const user = JSON.parse(userData);
    
    const fullTopicData = {
      title: topicData.title,
      content: topicData.content,
      userId: user.id,
      sectionId: parseInt(sectionId)
    };

    dispatch(createTopic({ 
      sectionId: parseInt(sectionId),
      topicData: fullTopicData 
    }));
  };

  if (status === 'loading') return <div className="forum-loading">Загрузка...</div>;
  if (status === 'failed') return <div className="forum-error">Ошибка: {error}</div>;
  if (!section) return <div className="forum-not-found">Раздел не найден</div>;

  console.log('Текущий раздел:', section);
  console.log('Темы раздела:', section?.topics);

  return (
    <div className="forum-section-container">
      <div className="forum-section-header">
        <h1 className="forum-section-title">Раздел: {section.name}</h1>
        <p className="forum-section-description">
          {section.description || 'Обсуждение вопросов по данной теме'}
        </p>
        <button 
          className="forum-create-topic-btn"
          onClick={() => setModalOpen(true)}
        >
          + Создать новую тему
        </button>
      </div>

      <CreateTopicModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateTopic}
      />

      <div className="forum-topics-list">
        <h2 className="topics-list-title">Темы обсуждения</h2>
        {section?.topics?.length > 0 ? ( // ✅ Безопасная проверка
          <ul className="topics-list">
            {section.topics.map((topic) => (
              <li key={topic.id} className="topic-item">
                <Link 
                  to={`/forum/sections/${sectionId}/topics/${topic.id}`}
                  className="topic-link"
                >
                  <span className="topic-title">
                    {topic.title || 'Тема для разговора'} {/* ✅ Fallback */}
                  </span>
                  <span className="topic-meta">
                    {topic.postCount ? `${topic.postCount} сообщений` : 'Напишите своё сообщение'}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-topics-message">
            В этом разделе пока нет тем. Будьте первым!
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionPage;
