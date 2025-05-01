import React from 'react';
import { useDispatch } from 'react-redux';
import { removeMember, updateMember } from '../../store/slice/groupSlice';
import './MemberTable.css';

const MemberTable = ({ members, groupId, course }) => {
  const dispatch = useDispatch();

  const handleRemove = (userId) => {
    if (window.confirm('Вы уверены, что хотите удалить участника?')) {
      dispatch(removeMember({ course, id: groupId, userId }));
    }
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateMember({ 
      course, 
      id: groupId, 
      userId, 
      memberData: { role: newRole } 
    }));
  };

  return (
    <table className="member-table">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Email</th>
          <th>Роль</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {members.map(member => (
          <tr key={member.id_user}>
            <td>
              <div className="user-info">
                <img 
                  src={member.User?.avatar || '/default-avatar.png'} 
                  alt={member.User?.username} 
                  className="avatar"
                />
                {member.User?.username}
              </div>
            </td>
            <td>{member.User?.email}</td>
            <td>
              <select
                value={member.role}
                onChange={(e) => handleRoleChange(member.id_user, e.target.value)}
              >
                <option value="member">Участник</option>
                <option value="moderator">Модератор</option>
                <option value="admin">Администратор</option>
              </select>
            </td>
            <td>
              <button 
                onClick={() => handleRemove(member.id_user)}
                className="remove-button"
              >
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MemberTable;