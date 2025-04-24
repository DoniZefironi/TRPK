import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeMember } from '../../store/slice/groupSlice';
import './MembersList.css';

const MembersList = ({ members, groupId }) => {
  const dispatch = useDispatch();
  const { currentCourse } = useSelector(state => state.groups);

  const handleRemoveMember = (userId) => {
    if (window.confirm('Вы уверены, что хотите удалить этого участника?')) {
      dispatch(removeMember({ course: currentCourse, id: groupId, userId }));
    }
  };

  return (
    <div className="members-list">
      {members.length === 0 ? (
        <p>Нет участников в группе</p>
      ) : (
        <ul>
          {members.map(member => (
            <li key={member.id_user} className="member-item">
              <div className="member-info">
                <img 
                  src={member.User?.avatar || '/default-avatar.png'} 
                  alt={member.User?.username} 
                  className="member-avatar"
                />
                <div>
                  <span className="member-name">{member.User?.username}</span>
                  <span className="member-role">{member.role}</span>
                </div>
              </div>
              <button 
                className="remove-member-btn"
                onClick={() => handleRemoveMember(member.id_user)}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MembersList;