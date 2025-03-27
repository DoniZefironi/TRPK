import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../store/slice/userSlice';
import { useNavigate } from 'react-router-dom'; // Хук для навигации
import './EditProfileComp.css';

const EditProfileComp = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Инициализация useNavigate

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
  
      // Убираем пустые поля из formData
      const cleanedData = Object.fromEntries(
        Object.entries(formData).filter(([_, v]) => v !== '')
      );
  
      // Отправляем данные через Redux
      await dispatch(
        updateUser({
          userId,
          userData: cleanedData,
          avatar,
        })
      ).unwrap();
  
      navigate('/profile'); // Перенаправляем на профиль после успешного обновления
    } catch (error) {
      console.error('Ошибка редактирования:', error);
      alert(error.message || 'Ошибка обновления профиля');
    }
  };
  

  return (
    <div className="edit-profile-container">
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <h2>Edit Profile</h2>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
        <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} placeholder="Birthdate" />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio"></textarea>
        <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Status" />
        <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="Website" />
        <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn" />
        <input type="text" name="telegram" value={formData.telegram} onChange={handleChange} placeholder="Telegram" />
        <select name="permissions" value={formData.permissions} onChange={handleChange}>
          <option value="electronics">Electronics</option>
          <option value="informatics">Informatics</option>
          <option value="iot">IoT</option>
        </select>
        <input type="file" name="avatar" onChange={handleFileChange} />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfileComp;
