import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/slice/postSlice';

const CreatePostForm = ({ topicId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content) {
      setError('Сообщение не может быть пустым');
      return;
    }
    
    if (!user) {
      setError('Необходимо авторизоваться');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await dispatch(createPost({ content, topicId, userId: user.id_user }));
      setContent('');
      setError(null);
    } catch (err) {
      setError('Ошибка при отправке сообщения');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post-form">
      <h3>Ответить в тему</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Напишите ваш ответ..."
          rows="5"
        />
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="btn-submit"
        >
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;