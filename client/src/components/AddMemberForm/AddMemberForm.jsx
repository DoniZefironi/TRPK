import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMember } from '../../store/slice/groupSlice';
import './AddMemberForm.css';

const AddMemberForm = ({ groupId }) => {
  const dispatch = useDispatch();
  const { currentCourse } = useSelector(state => state.groups);
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('member');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) return;
    
    dispatch(addMember({
      course: currentCourse,
      id: groupId,
      memberData: { userId, role }
    }));
    
    setUserId('');
    setRole('member');
  };

  return (
    <form className="add-member-form" onSubmit={handleSubmit}>
      <h5>Добавить участника</h5>
      <div className="form-group">
        <label>ID пользователя:</label>
        <input 
          type="text" 
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Роль:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="member">Участник</option>
          <option value="admin">Администратор</option>
          <option value="leader">Лидер</option>
        </select>
      </div>
      <button type="submit" className="submit-btn">Добавить</button>
    </form>
  );
};

export default AddMemberForm;