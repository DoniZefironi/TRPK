import React, { useState } from 'react';
import './CreateTopicModal.css'; // Добавим стили отдельно

const CreateTopicModal = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await onCreate({ title, content });
    setTitle('');
    setContent('');
    onClose();
  } catch (error) {
    console.error("Ошибка создания темы:", error);
    alert("Не удалось создать тему. Проверьте данные и попробуйте снова.");
  }
};

  if (!isOpen) return null;

  return (
    <div className="topicmodal-overlay" onClick={onClose}>
      <div className="topicmodal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Создать тему</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Название темы"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Содержание"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="topicmodal-buttons">
            <button type="submit">Создать</button>
            <button type="button" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTopicModal;