import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById } from '../../store/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import noavatar from '../../img/noavatar.png';
import EditProfileComp from '../EditProfileComp/EditProfileComp';
import './ProfileComp.css';

const ProfileComp = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { user, isLoading, error } = useSelector((state) => state.user); // Теперь `user`, а не `profile`
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('Текущий пользователь:', currentUser);
  console.log('Состояние пользователя:', { user, isLoading, error });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.id) {
      console.log('Dispatching getUserById для userId:', currentUser.id);
      dispatch(getUserById(currentUser.id))
        .then((action) => console.log('Результат dispatch:', action))
        .catch((err) => console.error('Ошибка dispatch:', err));
    } else {
      console.warn('currentUser.id отсутствует');
    }
  }, [dispatch, currentUser?.id]);

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
        <p className="error-message">{error || 'Неизвестная ошибка'}</p>
        <button onClick={() => dispatch(getUserById(currentUser.id))} className="retry-btn">
          Повторить попытку
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="no-data-container">
        <p>Пользователь не найден</p>
        {currentUser?.id && (
          <button onClick={() => dispatch(getUserById(currentUser.id))} className="retry-btn">
            Загрузить пользователя
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
            <img src={user.avatar || noavatar} alt="User Avatar" className="avatar-image" />
          </div>
          <div className="profile-personal-info">
            <h2 className="profile-name">{user.username}</h2>
            <p>Status: {user.status || 'Not specified'}</p>
            <p>Birthdate: {user.birthdate || 'No birthdate provided'}</p>
          </div>
        </div>

        <div className="profile-contacts boxshadow">
          <h3 className="profile-section-title">Contacts</h3>
          <ul className="profile-contacts-list">
            <li className="profile-contact-item">
              E-mail: <a href={`mailto:${user.email}`}>{user.email}</a>
            </li>
            <li className="profile-contact-item">
              Telegram: {user.telegram || 'Not specified'}
            </li>
            <li className="profile-contact-item">
              Phone: {user.phone || 'Not specified'}
            </li>
            <li className="profile-contact-item">
              Website: {user.website ? (
                <a href={user.website.startsWith('http') ? user.website : `https://${user.website}`}>
                  {user.website}
                </a>
              ) : 'No website provided'}
            </li>
            <li className="profile-contact-item">
              LinkedIn: {user.linkedin || 'Not specified'}
            </li>
          </ul>
          <div className="profile-status">
            <h3 className="profile-section-title">Location</h3>
            <p>{user.location || 'Not specified'}</p>
          </div>
        </div>
      </div>
      
      <div className='about boxshadow'>
        <h3>About</h3>
        <p className="profile-bio">{user.bio || 'No bio provided'}</p>
      </div>

      <div className='boxshadow'>
        <div className="profile-permissions">
          <h3 className="profile-section-title">Permissions</h3>
          <p>{user.permissions || 'Not specified'}</p>
        </div>

        <div className="profile-joined-at">
          <h3 className="profile-section-title">Joined At</h3>
          <p>
            {user.joined_at ? 
              new Date(user.joined_at).toLocaleDateString('ru-RU') : 
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
