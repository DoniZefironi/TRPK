import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchForums } from '../../store/slice/forumSlice';

const ForumList = () => {
  const dispatch = useDispatch();
  const { forums, isLoading, error } = useSelector(state => state.forum);

  useEffect(() => {
    dispatch(fetchForums());
  }, [dispatch]);

  if (isLoading) return <div>Loading forums...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="forum-list">
      <h1>Форумы</h1>
      <div className="forums">
        {forums.map(forum => (
          <div key={forum.id_forum} className="forum-card">
            <h2>
              <Link to={`/forum/${forum.id_forum}`}>
                {forum.section === 'electronics' && 'Электроника'}
                {forum.section === 'informatics' && 'Информатика'}
                {forum.section === 'IoT' && 'IoT'}
              </Link>
            </h2>
            <p>{forum.rules}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumList;