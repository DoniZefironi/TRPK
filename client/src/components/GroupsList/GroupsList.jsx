import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../../store/slice/groupSlice';
import GroupCard from '../GroupCard/GroupCard';
import CreateGroupPanel from '../CreateGroupModal/CreateGroupModal';
import './GroupsList.css';

const GroupsList = () => {
  const dispatch = useDispatch();
  const { groups, currentCourse, loading, pagination } = useSelector(state => state.groups);
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (currentCourse) {
      dispatch(fetchGroups({ course: currentCourse, page }));
    }
  }, [currentCourse, page, dispatch]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (!currentCourse) return null;

  return (
    <div className="groups-list">
      <div className="groups-header">
        <h2>Группы курса {currentCourse.toUpperCase()}</h2>
        <button 
          className="add-group-btn" 
          onClick={() => setShowCreatePanel(!showCreatePanel)} // Тогглим панель
        >
          {showCreatePanel ? 'Скрыть' : 'Добавить группу'}
        </button>
      </div>

      {loading ? (
        <div className="loading">Загрузка...</div>
      ) : groups.length === 0 ? (
        <div className="no-groups">Нет доступных групп</div>
      ) : (
        <>
          <div className="groups-grid">
            {groups.map(group => (
              <GroupCard 
                key={group.id_group} 
                group={group}
                course={currentCourse} // Передаем текущий курс явно
              />
            ))}
          </div>
          
          <div className="pagination">
            <button 
              disabled={page === 1} 
              onClick={() => handlePageChange(page - 1)}
            >
              Назад
            </button>
            <span>Страница {page}</span>
            <button 
              disabled={groups.length < pagination.limit}
              onClick={() => handlePageChange(page + 1)}
            >
              Вперед
            </button>
          </div>
        </>
      )}

        <CreateGroupPanel 
        isVisible={showCreatePanel}
        onClose={() => setShowCreatePanel(false)}
        course={currentCourse}
      />
    </div>
  );
};

export default GroupsList;