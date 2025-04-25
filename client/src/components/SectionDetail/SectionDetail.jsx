import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchSectionById } from '../../store/slice/sectionSlice';
import { fetchTopicsBySection } from '../../store/slice/topicSlice';
import CreateTopicModal from '../CreateTopicModal/CreateTopicModal';

const SectionDetail = () => {
  const { forumId, sectionId } = useParams();
  const dispatch = useDispatch();
  const { currentSection } = useSelector((state) => state.section);
  const { topics, status, pagination } = useSelector((state) => state.topic);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchSectionById(sectionId));
    dispatch(fetchTopicsBySection({ sectionId, params: { page } }));
  }, [sectionId, page, dispatch]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (!currentSection) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section-detail">
      <div className="section-header">
        <h1>{currentSection.name}</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-create-topic"
        >
          Создать тему
        </button>
      </div>
      <p>{currentSection.description}</p>
      
      <div className="topics-list">
        {status === 'loading' ? (
          <div>Loading topics...</div>
        ) : (
          <>
            <table className="topics-table">
              <thead>
                <tr>
                  <th>Тема</th>
                  <th>Автор</th>
                  <th>Ответы</th>
                  <th>Просмотры</th>
                  <th>Последнее сообщение</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic) => (
                  <tr key={topic.id}>
                    <td>
                      <Link to={`/forum/${forumId}/section/${sectionId}/topic/${topic.id}`}>
                        {topic.title}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/user/${topic.user.id_user}`}>
                        {topic.user.username}
                      </Link>
                    </td>
                    <td>{topic.postCount}</td>
                    <td>{topic.views}</td>
                    <td>{new Date(topic.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="pagination">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={pageNum === page}
                  className={pageNum === page ? 'active' : ''}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      
      <CreateTopicModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        sectionId={sectionId}
      />
    </div>
  );
};

export default SectionDetail;