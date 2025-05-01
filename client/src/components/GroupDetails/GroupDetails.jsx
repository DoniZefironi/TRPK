import React from 'react';
import { useSelector } from 'react-redux';
import MembersList from '../MembersList/MembersList';
import AddMemberForm from '../AddMemberForm/AddMemberForm';
import './GroupDetails.css';

const GroupDetails = ({ groupId, course }) => {
  const { groupDetails, members } = useSelector(state => state.groups);

  if (!groupDetails) return <div className="loading">Загрузка деталей группы...</div>;

  return (
    <div className="group-details">
      <div className="group-info">
        <h4>Информация о группе</h4>
        <p><strong>Статус:</strong> {groupDetails.status}</p>
        <p><strong>Макс. участников:</strong> {groupDetails.max_members}</p>
        <p><strong>Создана:</strong> {new Date(groupDetails.created_at).toLocaleDateString()}</p>
      </div>
      
      <div className="group-members">
        <h4>Участники ({members.length})</h4>
        <MembersList 
          members={members} 
          groupId={groupId} 
          course={course} // Передаем курс в MembersList
        />
        <AddMemberForm groupId={groupId} course={course} />
      </div>
    </div>
  );
};

export default GroupDetails;