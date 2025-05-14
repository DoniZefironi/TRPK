import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTopic } from '../../store/slice/forumThunks';
import './CreateTopicModal.css';

const CreateTopicModal = ({ sectionId, onClose, isModalOpen }) => {
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  
  const currentUserId = useSelector(state => state.auth.user?.id_user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Заполните все поля');
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(createTopic({
        title,
        content,
        sectionId,
        userId: currentUserId
      })).unwrap();
      onClose();
    } catch (err) {
      setError(err.message || 'Ошибка при создании темы');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`create-topic-modal-overlay ${isModalOpen ? 'show' : ''}`}>
      <div className={`create-topic-modal-container ${isModalOpen ? 'show' : ''}`}>
        <div className="create-topic-modal-header">
          <h2>Новая тема</h2>
          <button onClick={onClose} className="create-topic-close-btn">&times;</button>
        </div>
  
        <form onSubmit={handleSubmit} className="create-topic-form">
          <div className="create-topic-form-group">
            <label htmlFor="create-topic-title">Заголовок</label>
            <input
              id="create-topic-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок темы"
              maxLength={100}
              disabled={isSubmitting}
            />
          </div>
  
          <div className="create-topic-form-group">
            <label htmlFor="create-topic-content">Содержание</label>
            <textarea
              id="create-topic-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Подробно опишите вашу тему"
              rows={8}
              disabled={isSubmitting}
            />
          </div>
  
          {error && <div className="error-message">{error}</div>}
  
          <div className="create-topic-form-actions">
            <button 
              type="button" 
              onClick={onClose}
              className="cancel-btn"
              disabled={isSubmitting}
            >
              Отмена
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Создание...' : 'Создать тему'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTopicModal;
