import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Добавляем useSelector
import { createTopic } from '../../store/slice/forumThunks';
import './CreateTopicForm.css';

const CreateTopicModal = ({ sectionId, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  
  // Получаем ID текущего пользователя из хранилища
  const currentUserId = useSelector(state => state.auth.user?.id_user); // Добавленная строка

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
        userId: currentUserId // Используем полученный ID
      })).unwrap();
      onClose();
    } catch (err) {
      setError(err.message || 'Ошибка при создании темы');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Новая тема</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="topic-form">
          <div className="form-group">
            <label htmlFor="topic-title">Заголовок</label>
            <input
              id="topic-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок темы"
              maxLength={100}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="topic-content">Содержание</label>
            <textarea
              id="topic-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Подробно опишите вашу тему"
              rows={8}
              disabled={isSubmitting}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
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