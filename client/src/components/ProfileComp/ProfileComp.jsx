import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../store/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import noavatar from '../../img/noavatar.png';
import EditProfileComp from '../EditProfileComp/EditProfileComp';
import './ProfileComp.css';

const ProfileComp = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { profile, isLoading, error } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('Текущий пользователь:', currentUser);
  console.log('Состояние профиля:', { profile, isLoading, error });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Сработал useEffect, currentUser:', currentUser);
    if (currentUser?.id) {  // Изменили на id вместо id_user
      console.log('Dispatching getUserProfile для userId:', currentUser.id);
      dispatch(getUserProfile(currentUser.id))
        .then((action) => {
          console.log('Результат dispatch:', action);
        })
        .catch((err) => {
          console.error('Ошибка dispatch:', err);
        });
    } else {
      console.warn('currentUser.id отсутствует');
    }
  }, [dispatch, currentUser?.id]);  // Изменили зависимость
  
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const navigateToMaterialsPanel = () => {
    navigate('/materials-panel'); 
  };

  // Улучшенная обработка состояний
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загрузка профиля...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Ошибка загрузки профиля:</p>
        <p className="error-message">
          {error.message || 'Неизвестная ошибка'}
        </p>
        <button 
          onClick={() => dispatch(getUserProfile(currentUser.id_user))}
          className="retry-btn"
        >
          Повторить попытку
        </button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="no-data-container">
        <p>Профиль пользователя не найден</p>
        {currentUser?.id_user && (
          <button 
            onClick={() => dispatch(getUserProfile(currentUser.id_user))}
            className="retry-btn"
          >
            Загрузить профиль
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className='gapcheking'>
        <div className='boxshadow'>
          <div className="profile-avatar">
            <img 
              src={profile.avatar || noavatar} 
              alt="User Avatar" 
              className="avatar-image" 
            />
          </div>
          <div className="profile-personal-info">
            <h2 className="profile-name">{profile.username}</h2>
            <p>Status: {profile.status || 'Not specified'}</p>
            <p>Birthdate: {profile.birthdate || 'No birthdate provided'}</p>
          </div>
        </div>

        <div className="profile-contacts boxshadow">
          <h3 className="profile-section-title">Contacts</h3>
          <ul className="profile-contacts-list">
            <li className="profile-contact-item">
              E-mail: <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li className="profile-contact-item">
              Telegram: {profile.telegram || 'Not specified'}
            </li>
            <li className="profile-contact-item">
              Phone: {profile.phone || 'Not specified'}
            </li>
            <li className="profile-contact-item">
              Website: {profile.website ? (
                <a href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}>
                  {profile.website}
                </a>
              ) : 'No website provided'}
            </li>
            <li className="profile-contact-item">
              LinkedIn: {profile.linkedin || 'Not specified'}
            </li>
          </ul>
          <div className="profile-status">
            <h3 className="profile-section-title">Location</h3>
            <p>{profile.location || 'Not specified'}</p>
          </div>
        </div>
      </div>
      
      <div className='about boxshadow'>
        <h3>About</h3>
        <p className="profile-bio">{profile.bio || 'No bio provided'}</p>
      </div>

      <div className='boxshadow'>
        <div className="profile-permissions">
          <h3 className="profile-section-title">Permissions</h3>
          <p>{profile.permissions || 'Not specified'}</p>
        </div>

        <div className="profile-joined-at">
          <h3 className="profile-section-title">Joined At</h3>
          <p>
            {profile.joined_at ? 
              new Date(profile.joined_at).toLocaleDateString('ru-RU') : 
              'Not specified'}
          </p>
        </div>
      </div>
      
      <div className="profile-actions">
        <button onClick={handleEditClick} className="edit-profile-btn">
          Редактировать профиль
        </button>
        <button onClick={navigateToMaterialsPanel} className="materials-panel-btn">
          Manage Materials
        </button>
      </div>

      {isModalOpen && (
        <EditProfileComp 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default ProfileComp;