import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../../store/slice/groupSlice';
import GroupCard from '../GroupCard/GroupCard';
import CreateGroupPanel from '../CreateGroupModal/CreateGroupModal';
import './GroupsList.css';

const GroupsList = () => {
  const dispatch = useDispatch();
  const { groups, currentCourse, loading } = useSelector(state => state.groups);
  const [showCreatePanel, setShowCreatePanel] = useState(false);

  useEffect(() => {
    if (currentCourse) {
      dispatch(fetchGroups({ course: currentCourse }));
    }
  }, [currentCourse, dispatch]);

  if (!currentCourse) {
    return <div className="no-course-selected">Выберите курс</div>;
  }

  return (
    <div className="groups-container">
      <div className="groups-header">
        <h2 className="groups-title">Группы курса {currentCourse.toUpperCase()}</h2>
        <button
          type="button"
          className="create-group-button"
          onClick={() => setShowCreatePanel(true)}
        >
          Создать группу
        </button>
      </div>

      {loading ? (
        <div className="loading-indicator">Загрузка групп...</div>
      ) : groups.length === 0 ? (
        <div className="empty-state">Нет доступных групп</div>
      ) : (
        <div className="groups-grid">
          {groups.map(group => (
            <GroupCard 
              key={`${group.id_group}-${currentCourse}`}
              group={group}
              course={currentCourse}
            />
          ))}
        </div>
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