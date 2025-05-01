import React from 'react';
import './GroupInfo.css';

const GroupInfo = ({ group, course }) => {
  if (!group) {
    return <div className="loading">Загрузка информации о группе...</div>;
  }

  return (
    <div className="group-info">
      <h1>{group.name} ({course.toUpperCase()})</h1>
      <p className="description">{group.description}</p>
      
      <div className="stats">
        <div className="stat-item">
          <span className="stat-label">Статус:</span>
          <span className="stat-value">{group.status}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Участников:</span>
          <span className="stat-value">
            {group.member_count || 0}/{group.max_members}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Создана:</span>
          <span className="stat-value">
            {new Date(group.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GroupInfo;