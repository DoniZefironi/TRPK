import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById, updateUserByIdAction } from '../../store/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import './EditProfileComp.css';

const EditProfileComp = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.user);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    birthdate: '',
    location: '',
    bio: '',
    status: '',
    website: '',
    linkedin: '',
    telegram: '',
    permissions: 'electronics'
  });

  const [avatar, setAvatar] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        birthdate: user.birthdate?.split('T')[0] || '',
        location: user.location || '',
        bio: user.bio || '',
        status: user.status || '',
        website: user.website || '',
        linkedin: user.linkedin || '',
        telegram: user.telegram || '',
        permissions: user.permissions || 'electronics'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser?.id) {
      alert('Требуется авторизация');
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      // Отправляем обычный объект, а не FormData
      await dispatch(updateUserByIdAction({
        userId: currentUser.id,
        userData: formData,  // передаём обычный объект
        avatar: avatar      // передаём файл отдельно
      })).unwrap();
  
      onClose();
      // Вместо навигации лучше обновить данные через Redux
      navigate(0); // это плохая практика
      
    } catch (error) {
      console.error('Ошибка обновления:', error);
      alert(error.message || 'Произошла ошибка при обновлении профиля');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div className={`modal-overlay ${isVisible ? 'show' : ''}`} onClick={onClose}>
      <div className={`modal-container ${isVisible ? 'show' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Редактирование профиля</h2>
          <button onClick={onClose} className="close-btn" disabled={isSubmitting}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-group">
            <label>Имя пользователя *</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Телефон</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Дата рождения</label>
            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Локация</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>О себе</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" />
          </div>

          <div className="form-group">
            <label>Статус</label>
            <input type="text" name="status" value={formData.status} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Сайт</label>
            <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://example.com" />
          </div>

          <div className="form-group">
            <label>LinkedIn</label>
            <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="username" />
          </div>

          <div className="form-group">
            <label>Telegram</label>
            <input type="text" name="telegram" value={formData.telegram} onChange={handleChange} placeholder="@username" />
          </div>

          <div className="form-group">
            <label>Направление *</label>
            <select name="permissions" value={formData.permissions} onChange={handleChange} required>
              <option value="electronics">Electronics</option>
              <option value="informatics">Informatics</option>
              <option value="iot">IoT</option>
            </select>
          </div>

          <div className="form-group">
            <label>Аватар</label>
            <input type="file" id="avatar-upload" name="avatar" onChange={handleFileChange} accept="image/*" />
            {avatar && <span className="file-name">{avatar.name}</span>}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn" disabled={isSubmitting}>
              Отмена
            </button>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileComp;
