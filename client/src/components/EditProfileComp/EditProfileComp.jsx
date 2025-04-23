import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../store/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import './EditProfileComp.css';

const EditProfileComp = ({ isOpen, onClose }) => {
  const { profile } = useSelector((state) => state.user);
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

  // Инициализация формы данными профиля
  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        email: profile.email || '',
        phone: profile.phone || '',
        birthdate: profile.birthdate?.split('T')[0] || '', // Форматируем дату для input[type="date"]
        location: profile.location || '',
        bio: profile.bio || '',
        status: profile.status || '',
        website: profile.website || '',
        linkedin: profile.linkedin || '',
        telegram: profile.telegram || '',
        permissions: profile.permissions || 'electronics'
      });
    }
  }, [profile]);

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
    if (!profile?.id) {
      alert('Ошибка: ID пользователя не найден');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Создаем FormData и добавляем только измененные поля
      const formDataToSend = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });

      if (avatar) {
        formDataToSend.append('avatar', avatar);
      }

      await dispatch(updateProfile({
        userId: profile.id, // Используем profile.id вместо profile.id_user
        userData: formDataToSend
      })).unwrap();

      onClose();
      navigate(0); // Обновляем страницу
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
      alert(error.message || 'Произошла ошибка при обновлении профиля');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Редактирование профиля</h2>
          <button onClick={onClose} className="close-btn" disabled={isSubmitting}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          {/* Группы полей формы */}
          <div className="form-column">
            <div className="form-group">
              <label>Имя пользователя *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Телефон</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Дата рождения</label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Локация</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label>О себе</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Статус</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Сайт</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>

            <div className="form-group">
              <label>LinkedIn</label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="username"
              />
            </div>

            <div className="form-group">
              <label>Telegram</label>
              <input
                type="text"
                name="telegram"
                value={formData.telegram}
                onChange={handleChange}
                placeholder="@username"
              />
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label>Направление *</label>
              <select
                name="permissions"
                value={formData.permissions}
                onChange={handleChange}
                required
              >
                <option value="electronics">Electronics</option>
                <option value="informatics">Informatics</option>
                <option value="iot">IoT</option>
              </select>
            </div>

            <div className="form-group">
              <label>Аватар</label>
              <div className="avatar-upload">
                <input
                  type="file"
                  id="avatar-upload"
                  name="avatar"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <label htmlFor="avatar-upload" className="upload-btn">
                  {avatar ? 'Файл выбран' : 'Выберите файл'}
                </label>
                {avatar && (
                  <span className="file-name">{avatar.name}</span>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={onClose}
                className="cancel-btn"
                disabled={isSubmitting}
              >
                Отмена
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileComp;