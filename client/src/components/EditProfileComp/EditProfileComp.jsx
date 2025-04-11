import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../store/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import './EditProfileComp.css';

const EditProfileComp = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthdate: user?.birthdate || '',
    location: user?.location || '',
    bio: user?.bio || '',
    status: user?.status || '',
    website: user?.website || '',
    linkedin: user?.linkedin || '',
    telegram: user?.telegram || '',
    permissions: user?.permissions || '',
  });
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = user?.id_user;
      if (!userId) {
        throw new Error('User ID отсутствует');
      }

      const cleanedData = Object.fromEntries(
        Object.entries(formData).filter(([_, v]) => v !== '')
      );

      await dispatch(updateUser({ userId, userData: cleanedData, avatar })).unwrap();
      onClose(); // Закрытие модального окна после успешного сохранения
      navigate('/profile'); 
    } catch (error) {
      console.error('Ошибка редактирования:', error);
      alert(error.message || 'Ошибка обновления профиля');
    }
  };

  if (!isOpen) return null; // Если `isOpen` = false, модальное окно не рендерится

  return (
    <div className={`modal-overlay ${isOpen ? 'show' : ''}`}>
      <div className={`modal-container ${isOpen ? 'show' : ''}`}>
        <div className="modal-header">
          <h2>Редактирование профиля</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
  
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Имя пользователя" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Телефон" />
          <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} placeholder="Дата рождения" />
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Локация" />
          <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="О себе"></textarea>
          <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Статус" />
          <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="Сайт" />
          <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn" />
          <input type="text" name="telegram" value={formData.telegram} onChange={handleChange} placeholder="Telegram" />
          <select name="permissions" value={formData.permissions} onChange={handleChange}>
            <option value="electronics">Electronics</option>
            <option value="informatics">Informatics</option>
            <option value="iot">IoT</option>
          </select>
          <input type="file" name="avatar" onChange={handleFileChange} />
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Отмена</button>
            <button type="submit" className="submit-btn">Сохранить изменения</button>
          </div>
        </form>
      </div>
    </div>
  );  
};

export default EditProfileComp;
