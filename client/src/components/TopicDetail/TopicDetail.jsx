import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchTopicById, incrementViews } from '../../store/slice/topicSlice';
import { fetchPostsByTopic } from '../../store/slice/postSlice';
import CreatePostForm from '../CreatePostForm/CreatePostForm';

const TopicDetail = () => {
  const { forumId, sectionId, topicId } = useParams();
  const dispatch = useDispatch();
  const { currentTopic } = useSelector((state) => state.topic);
  const { posts, status } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchTopicById(topicId)).then(() => {
      dispatch(incrementViews());
    });
    dispatch(fetchPostsByTopic({ topicId }));
  }, [topicId, dispatch]);

  if (!currentTopic) {
    return <div>Loading...</div>;
  }

  return (
    <div className="topic-detail">
      <nav className="breadcrumbs">
        <Link to={`/forum/${forumId}`}>{currentTopic.section.name}</Link>
        {' > '}
        <Link to={`/forum/${forumId}/section/${sectionId}`}>{currentTopic.section.name}</Link>
        {' > '}
        <span>{currentTopic.title}</span>
      </nav>
      
      <div className="topic-header">
        <h1>{currentTopic.title}</h1>
        <div className="topic-meta">
          <span>Автор: <Link to={`/user/${currentTopic.user.id_user}`}>{currentTopic.user.username}</Link></span>
          <span>Дата: {new Date(currentTopic.createdAt).toLocaleString()}</span>
          <span>Просмотры: {currentTopic.views}</span>
        </div>
      </div>
      
      <div className="posts-list">
        {status === 'loading' ? (
          <div>Loading posts...</div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-author">
                <img 
                  src={post.user.avatar || '/default-avatar.png'} 
                  alt={post.user.username}
                  className="avatar"
                />
                <Link to={`/user/${post.user.id_user}`}>{post.user.username}</Link>
              </div>
              <div className="post-content">
                <div className="post-meta">
                  <span>{new Date(post.createdAt).toLocaleString()}</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
          ))
        )}
      </div>
      
      <CreatePostForm topicId={topicId} />
    </div>
  );
};

export default TopicDetail;