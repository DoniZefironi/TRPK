// SectionPage.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TopicItem from '../../components/TopicItem/TopicItem';
import CreateTopicModal from '../../components/CreateTopicForm/CreateTopicForm';
import Headers from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import { 
  fetchTopicsBySection, 
  fetchSections
} from '../../store/slice/forumThunks';
import './SectionPage.css';

export const SectionPage = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { 
    sections,
    topics, 
    currentSection, 
    status, 
    error 
  } = useSelector(state => state.forum);
  
  const { user } = useSelector(state => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // First load all sections if not loaded
    if (sections.length === 0) {
      dispatch(fetchSections());
    }
    
    // Then load topics for current section
    dispatch(fetchTopicsBySection(sectionId));
  }, [sectionId, dispatch, sections.length]);

  // Find current section from the loaded sections
  const currentSectionData = sections.find(section => section.id == sectionId) || {};

  const handleCreateTopicClick = () => {
    if (!user) {
      navigate('/login', { state: { from: `/forum/sections/${sectionId}` } });
      return;
    }
    setIsModalOpen(true);
  };

  if (status === 'loading' && sections.length === 0) {
    return <div className="loading-container">Загрузка данных...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <>
    <Headers />
    <div className="section-page">
      <div className="section-header">
        <h1>{currentSectionData?.name || 'Форум'}</h1>
        {currentSectionData?.description && (
          <p className="section-description">{currentSectionData.description}</p>
        )}
        
        <button 
          onClick={handleCreateTopicClick}
          className="create-topic-btn"
        >
          Создать тему
        </button>
      </div>

      <div className="topics-container">
        {topics.length > 0 ? (
          <div className="topics-list">
            {topics.map(topic => (
              <TopicItem 
                key={topic.id} 
                topic={topic} 
                user={user}
              />
            ))}
          </div>
        ) : (
          <div className="no-topics">
            <p>В этом разделе пока нет тем</p>
            <button 
              onClick={handleCreateTopicClick}
              className="create-first-topic-btn"
            >
              Создать первую тему
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
  <CreateTopicModal 
    sectionId={sectionId}
    isModalOpen={isModalOpen} // Добавляем передачу состояния
    onClose={() => setIsModalOpen(false)}
    onSuccess={() => {
      setIsModalOpen(false);
      dispatch(fetchTopicsBySection(sectionId));
    }}
  />
)}
    </div>
    <Footer />
    </>
  );
};