import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTopicById, getPostsByTopic, addPost } from '../../store/slice/forumSlice';


const TopicDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentTopic, posts, isLoading, error } = useSelector(state => state.forum);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    dispatch(getTopicById(id));
    dispatch(getPostsByTopic(id));
  }, [dispatch, id]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost({ content: newPost, id_topic: id }));
    setNewPost('');
  };

  if (isLoading) return <div>Loading topic...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="topic-detail">
      <h1>{currentTopic?.title}</h1>
      
      <div className="posts">
        {posts.map(post => (
          <div key={post.id_post} className="post">
            <div className="post-content">
              <p>{post.content}</p>
              <small>{new Date(post.created_at).toLocaleString()}</small>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Ваше сообщение..."
          required
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default TopicDetail;