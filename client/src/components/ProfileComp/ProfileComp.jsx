import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../../store/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import './ProfileComp.css';

const ProfileComp = () => {
  const { user, isLoading, error } = useSelector((state) => state.user || {}); // Подстраховка для undefined состояния
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Хук для навигации

  useEffect(() => {
    const userId = '1'; // ID текущего пользователя (можно взять из токена или другого источника)
    dispatch(getUserInfo(userId));
  }, [dispatch]);

  const handleEditClick = () => {
    navigate('/edit-profile'); // Переход на страницу редактирования профиля
  };

  const navigateToMaterialsPanel = () => {
    navigate('/materials-panel'); // Переход на страницу управления библиотекой материалов
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) {
    return <p>Нет данных пользователя</p>;
  }
  
  return (
    <div className="profile-container">
      {user ? (
        <>
          {/* Личная информация */}
          <div className="profile-personal-info">
            <h2 className="profile-name">{user.username}</h2>
            <p className="profile-location">Location: {user.location || 'Not specified'}</p>
            <p className="profile-bio">{user.bio || 'No bio provided'}</p>
          </div>

          {/* Аватар */}
          <div className="profile-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt="User Avatar" className="avatar-image" />
            ) : (
              <p>No avatar available</p>
            )}
          </div>

          {/* Контакты */}
          <div className="profile-contacts">
            <h3 className="profile-section-title">Contacts</h3>
            <ul className="profile-contacts-list">
              <li className="profile-contact-item">E-mail: <a href={`mailto:${user.email}`}>{user.email}</a></li>
              <li className="profile-contact-item">Telegram: {user.telegram || 'Not specified'}</li>
              <li className="profile-contact-item">Phone: {user.phone || 'Not specified'}</li>
              <li className="profile-contact-item">Website: <a href={user.website}>{user.website || 'No website provided'}</a></li>
              <li className="profile-contact-item">LinkedIn: {user.linkedin || 'Not specified'}</li>
            </ul>
          </div>

          {/* Дата рождения */}
          <div className="profile-birthdate">
            <h3 className="profile-section-title">Birthdate</h3>
            <p>{user.birthdate || 'No birthdate provided'}</p>
          </div>

          {/* Статус */}
          <div className="profile-status">
            <h3 className="profile-section-title">Status</h3>
            <p>{user.status || 'Not specified'}</p>
          </div>

          {/* Права доступа */}
          <div className="profile-permissions">
            <h3 className="profile-section-title">Permissions</h3>
            <p>{user.permissions || 'Not specified'}</p>
          </div>

          {/* Дата регистрации */}
          <div className="profile-joined-at">
            <h3 className="profile-section-title">Joined At</h3>
            <p>{new Date(user.joined_at).toLocaleDateString() || 'Not specified'}</p>
          </div>

          {/* Кнопка для редактирования */}
          <div className="profile-edit-button">
            <button onClick={handleEditClick} className="edit-profile-btn">
              Edit Profile
            </button>
          </div>

          {/* Кнопка для перехода на панель управления материалами */}
          <div className="materials-panel-button">
            <button onClick={navigateToMaterialsPanel} className="materials-panel-btn">
              Manage Materials
            </button>
          </div>
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default ProfileComp;

