import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTopic } from '../../store/slice/topicSlice';

const CreateTopicModal = ({ isOpen, onClose, sectionId }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !content) {
      setError('Все поля обязательны для заполнения');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await dispatch(createTopic({ title, content, sectionId }));
      onClose();
      setTitle('');
      setContent('');
    } catch (err) {
      setError('Ошибка при создании темы');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Создать новую тему</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="title">Название темы</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название темы"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content">Содержание</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Напишите ваше сообщение"
              rows="8"
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              onClick={onClose}
              className="btn-cancel"
            >
              Отмена
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-submit"
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