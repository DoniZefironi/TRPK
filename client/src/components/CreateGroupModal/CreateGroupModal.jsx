import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGroup } from '../../store/slice/groupSlice';
import './CreateGroupModal.css';

const CreateGroupModal = ({ isVisible, onClose, course }) => {
  const dispatch = useDispatch();
  console.log(course)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    course,
    max_members: 10,
    status: 'active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGroup(formData));
    onClose();
    setFormData({
      name: '',
      description: '',
      course,
      max_members: 10,
      status: 'active'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="create-group-panel">
      <div className="panel-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Создать новую группу ({course.toUpperCase()})</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Описание:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Макс. участников:</label>
            <input
              type="number"
              name="max_members"
              value={formData.max_members}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label>Статус:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Активная</option>
              <option value="inactive">Неактивная</option>
              <option value="archived">Архивированная</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">Создать</button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;