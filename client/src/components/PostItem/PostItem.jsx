import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import './PostItem.css';

const PostItem = ({ post, currentUserId, onReply, isReplying }) => {
  return (
    <div className={`post-item ${isReplying ? 'replying' : ''}`}>
      <div className="post-header">
        <div className="user-info">
          <img 
            src={post.User?.avatar || '/default-avatar.png'} 
            alt="Аватар" 
            className="avatar"
          />
          <span className="username">{post.User?.username || 'Аноним'}</span>
        </div>
        <span className="post-date">
          {format(new Date(post.createdAt), 'dd MMMM yyyy, HH:mm', { locale: ru })}
        </span>
      </div>
      
      <div className="post-content">
        {post.content}
      </div>

      <div className="post-actions">
      {post.User?.id_user === currentUserId && (
          <>
        <button 
          className={`action-btn ${isReplying ? 'active' : ''}`}
          onClick={() => onReply(post.User?.username)}
        >
          {isReplying ? 'Отмена' : 'Ответить'}
        </button>
        </>
        )}
        {post.User?.id_user !== currentUserId && (
          <>
            <button className="action-btn">Редактировать</button>
            <button className="action-btn danger">Удалить</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PostItem;