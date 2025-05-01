import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostItem from '../../components/PostItem/PostItem';
import Footer from '../../components/Footer/Footer'
import { 
  fetchTopic, 
  fetchPostsByTopic, 
  createPost
} from '../../store/slice/forumThunks';
import { resetForumStatus } from '../../store/slice/forumSlice';
import Header from '../../components/Header/Header';
import './TopicPage.css'
import noavatar from '../../img/noavatar.png'

export const TopicPage = () => {
  const { topicId } = useParams();
  const dispatch = useDispatch();
  const { 
    currentTopic, 
    posts, 
    status: forumStatus,
    error: forumError
  } = useSelector(state => state.forum);
  const { user } = useSelector(state => state.auth);
  const [newPostContent, setNewPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching topic with ID:', topicId); // Добавьте это
    if (!topicId) return;
    
    dispatch(resetForumStatus());
    dispatch(fetchTopic(topicId));
    dispatch(fetchPostsByTopic(topicId));
  }, [topicId, dispatch]);

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    
    if (!newPostContent.trim()) {
      setError('Сообщение не может быть пустым');
      return;
    }

    if (!user) {
      setError('Для отправки сообщения необходимо авторизоваться');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await dispatch(createPost({
        content: newPostContent,
        topicId,
        userId: user.id_user
      })).unwrap();
      
      setNewPostContent('');
      dispatch(fetchPostsByTopic(topicId));
    } catch (err) {
      setError(err.message || 'Ошибка при отправке сообщения');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Обработка состояний загрузки
  if (forumStatus === 'loading' && !currentTopic) {
    return <div className="loading">Загрузка темы...</div>;
  }

  if (forumError) {
    return (
      <div className="error">
        Ошибка: {forumError}
        <button onClick={() => {
          dispatch(resetForumStatus());
          dispatch(fetchTopic(topicId));
          dispatch(fetchPostsByTopic(topicId));
        }}>
          Повторить попытку
        </button>
      </div>
    );
  }

  if (!currentTopic) {
    return (
      <div className="error">
        Тема не найдена
        <p>Возможные причины:</p>
        <ul>
          <li>Тема была удалена</li>
          <li>Неверный идентификатор темы</li>
        </ul>
      </div>
    );
  }

  // Основной рендеринг (currentTopic гарантированно существует здесь)
  return (
    <>
    <Header />
    <div className="topic-page">
      <div className="topic-header">
        <h1>{currentTopic.title}</h1>
        <div className="topic-meta">
          <span>Автор: {currentTopic.User?.username || 'Аноним'}</span>
          <span>Дата: {new Date(currentTopic.createdAt).toLocaleDateString()}</span>
          <span>Просмотров: {currentTopic.views || 0}</span>
        </div>
      </div>

      <div className="topic-content">
        <p>{currentTopic.content}</p>
      </div>

      <div className="posts-section">
        <h2>Сообщения ({posts.length})</h2>
        
        {posts.length === 0 ? (
          <div className="no-posts">Пока нет сообщений. Будьте первым!</div>
        ) : (
          <div className="posts-list">
            {posts.map(post => (
              <PostItem 
                key={post.id} 
                post={post} 
                currentUserId={user?.id}
              />
            ))}
          </div>
        )}
      </div>

      {user && (
        <div className="post-form">
          <h3>Добавить сообщение</h3>
          {error && <div className="form-error">{error}</div>}
          
          <form onSubmit={handleSubmitPost}>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Ваше сообщение..."
              rows={5}
              disabled={isSubmitting}
            />
            
            <button 
              type="submit" 
              disabled={isSubmitting || !newPostContent.trim()}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
          </form>
        </div>
      )}

      {!user && (
        <div className="auth-notice">
          Только авторизованные пользователи могут оставлять сообщения
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};