// TopicItem.js
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import './TopicItem.css';

const TopicItem = ({ topic, user }) => {
  const isAuthor = user?.id_user === topic.User?.id_user;

  return (
    <div className={`topic-item ${isAuthor ? 'author-topic' : ''}`}>
      <div className="topic-main">
        <Link to={`/forum/topics/${topic.id}`} className="topic-title">
          <h3>{topic.title}</h3>
        </Link>
        
        <div className="topic-content-preview">
          {topic.content.length > 150 
            ? `${topic.content.substring(0, 150)}...` 
            : topic.content}
        </div>
      </div>

      <div className="topic-meta">
        <div className="author-info">
          <img 
            src={topic.User?.avatar || '/default-avatar.png'} 
            alt="Автор" 
            className="author-avatar"
          />
          <span className="author-name">
            {topic.User?.username || 'Аноним'}
          </span>
        </div>

        <div className="topic-stats">
          <span className="stat-item">
            <i className="icon-message"></i> {topic.postCount || 0}
          </span>
          <span className="stat-item">
            <i className="icon-eye"></i> {topic.views || 0}
          </span>
          <span className="stat-date">
            {format(new Date(topic.createdAt), 'dd MMM yyyy', { locale: ru })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopicItem;