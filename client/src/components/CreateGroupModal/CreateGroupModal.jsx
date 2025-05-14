import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createGroup } from '../../store/slice/groupSlice';
import './CreateGroupModal.css';

const CreateGroupModal = ({ isVisible, onClose, course }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    max_members: 10,
    status: 'active'
  });

  useEffect(() => {
    if (isVisible) {
      setFormData({
        name: '',
        description: '',
        max_members: 10,
        status: 'active'
      });
    }
  }, [isVisible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await dispatch(createGroup({
        ...formData,
        course: course
      })).unwrap();
      
      onClose();
    } catch (error) {
      console.error('Ошибка при создании группы:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`create-group-modal-container ${isVisible ? 'visible' : ''}`}>
      <div className="create-group-modal-overlay" onClick={onClose} />
      
      <div className="create-group-modal-content">
        <div className="create-group-modal-header">
          <h3>Создать новую группу ({course.toUpperCase()})</h3>
          <button 
            className="create-group-close-btn" 
            onClick={onClose}
            aria-label="Закрыть"
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="create-group-form-group">
            <label htmlFor="group-name">Название:</label>
            <input
              id="group-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={3}
            />
          </div>
          
          <div className="create-group-form-group">
            <label htmlFor="group-description">Описание:</label>
            <textarea
              id="group-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>
          
          <div className="create-group-form-row">
            <div className="create-group-form-group">
              <label htmlFor="max-members">Макс. участников:</label>
              <input
                id="max-members"
                type="number"
                name="max_members"
                value={formData.max_members}
                onChange={handleChange}
                min="1"
                max="50"
                required
              />
            </div>
            
            <div className="create-group-form-group">
              <label htmlFor="group-status">Статус:</label>
              <select
                id="group-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Активная</option>
                <option value="inactive">Неактивная</option>
                <option value="archived">Архивированная</option>
              </select>
            </div>
          </div>
          
          <div className="create-group-form-actions">
            <button type="button" className="create-group-cancel-btn" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="create-group-submit-btn">
              Создать группу
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;