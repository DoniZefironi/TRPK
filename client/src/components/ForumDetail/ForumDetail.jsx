import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchForumById } from '../../store/slice/forumSlice';
import { fetchSections } from '../../store/slice/sectionSlice';

const ForumDetail = () => {
  const { forumId } = useParams();
  const dispatch = useDispatch();
  const { currentForum } = useSelector((state) => state.forum);
  const { sections, status } = useSelector((state) => state.section);

  useEffect(() => {
    dispatch(fetchForumById(forumId));
    dispatch(fetchSections({ forumId }));
  }, [forumId, dispatch]);

  if (!currentForum) {
    return <div>Loading...</div>;
  }

  return (
    <div className="forum-detail">
      <h1>{currentForum.section}</h1>
      <p>{currentForum.description}</p>
      
      <div className="sections-list">
        <h2>Разделы</h2>
        {status === 'loading' ? (
          <div>Loading sections...</div>
        ) : (
          <div className="sections-grid">
            {sections.map((section) => (
              <div key={section.id} className="section-card">
                <h3>
                  <Link to={`/forum/${forumId}/section/${section.id}`}>
                    {section.name}
                  </Link>
                </h3>
                <p>{section.description}</p>
                <div className="section-stats">
                  <span>Тем: {section.topicsCount}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumDetail;