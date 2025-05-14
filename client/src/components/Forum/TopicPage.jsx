import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsByTopic, createPost } from '../../store/slice/forumSlice';
import { useParams } from 'react-router-dom';
import './TopicPage.css'; // Добавим CSS для стилизации

const TopicPage = () => {
  const { sectionId, topicId } = useParams();
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.forum);
  const [newPostContent, setNewPostContent] = useState('');

  // Получаем данные пользователя из localStorage
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  // Проверяем, что userId, sectionId и topicId существуют
useEffect(() => {
  if (sectionId && topicId && user.id && posts.length === 0) {  // Проверка на наличие постов
    dispatch(fetchPostsByTopic({ section: sectionId, topicId }));
  } else {
    console.error('Ошибка: отсутствуют обязательные параметры или посты уже загружены');
  }
}, [sectionId, topicId, user, dispatch, posts.length]);  // posts.length, чтобы избежать повторных запросов


const handleCreatePost = () => {
  if (!newPostContent.trim()) {
    console.error('Ошибка: Пустое сообщение');
    return;
  }

  const userData = localStorage.getItem('user');
  if (!userData) {
    console.error('Ошибка: Пользователь не найден в localStorage');
    return;
  }

  const user = JSON.parse(userData);
  if (!sectionId || !topicId || !user.id) {
    console.error('Ошибка: отсутствуют обязательные данные');
    return;
  }

  dispatch(createPost({
    content: newPostContent,
    topicId,
    sectionId,
    userId: user.id
  }));

  setNewPostContent('');
};


  if (status === 'loading') return <div>Загрузка...</div>;
  if (status === 'failed') return <div>Ошибка: {error}</div>;

  return (
    <div className="topic-page">
      <h1>Сообщения темы</h1>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <p className="post-content">{post.content}</p>
            <p className="post-author">От: {post.author}</p>
          </li>
        ))}
      </ul>

      {/* Панель для создания сообщения */}
      <div className="post-create-panel">
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Напишите ваше сообщение..."
          className="post-textarea"
        />
        <button onClick={handleCreatePost} className="create-post-button">
          Создать сообщение
        </button>
      </div>
    </div>
  );
};

export default TopicPage;
