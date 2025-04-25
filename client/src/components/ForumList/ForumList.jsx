import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchForums } from '../../store/slice/forumSlice';

const ForumList = () => {
  const dispatch = useDispatch();
  const { forums, status, error } = useSelector((state) => state.forum);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchForums());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="forum-list">
      <h1>Форумы</h1>
      <div className="forums-container">
        {forums.map((forum) => (
          <div key={forum.id} className="forum-card">
            <h2>
              <Link to={`/forum/${forum.id}`}>{forum.section}</Link>
            </h2>
            <p>{forum.description}</p>
            <div className="forum-stats">
              <span>Тем: {forum.topicsCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumList;