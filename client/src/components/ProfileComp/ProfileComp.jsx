import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../../store/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import noavatar from '../../img/noavatar.png';
import EditProfileComp from '../EditProfileComp/EditProfileComp';
import './ProfileComp.css';

const ProfileComp = () => {
  const { user: currentUser } = useSelector((state) => state.auth || {});
  const { user, isLoading, error } = useSelector((state) => state.user || {});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.id_user) { 
      dispatch(getUserInfo(currentUser.id_user));
    } else {
      console.log('No user ID available'); 
    }
  }, [dispatch, currentUser?.id_user]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const navigateToMaterialsPanel = () => {
    navigate('/materials-panel'); 
  };

  if (isLoading) return <p>Loading...</p>;
  
  // Обработка ошибки - преобразуем объект ошибки в строку
  if (error) {
    const errorMessage = typeof error === 'object' ? error.message || JSON.stringify(error) : error;
    return <p>Error: {errorMessage}</p>;
  }
  
  if (!user) {
    return <p>Нет данных пользователя</p>;
  }
  
  return (
    <div className="profile-container">
      {user ? (
        <>
          <div className='gapcheking'>
            <div className='boxshadow'>
              <div className="profile-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt="User Avatar" className="avatar-image" />
                ) : (
                  <img src={noavatar} alt="Нет аватара" />
                )}
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
                <li className="profile-contact-item">E-mail: <a href={`mailto:${user.email}`}>{user.email}</a></li>
                <li className="profile-contact-item">Telegram: {user.telegram || 'Not specified'}</li>
                <li className="profile-contact-item">Phone: {user.phone || 'Not specified'}</li>
                <li className="profile-contact-item">Website: <a href={user.website}>{user.website || 'No website provided'}</a></li>
                <li className="profile-contact-item">LinkedIn: {user.linkedin || 'Not specified'}</li>
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
              <p>{user.joined_at ? new Date(user.joined_at).toLocaleDateString() : 'Not specified'}</p>
            </div>
          </div>
          
          <div>
            <div className="profile-edit-button">
            <button onClick={handleEditClick} className="edit-profile-btn">Редактировать профиль</button>
            </div>
            {isModalOpen && (
        <EditProfileComp 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
            <div className="materials-panel-button">
              <button onClick={navigateToMaterialsPanel} className="materials-panel-btn">
                Manage Materials
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default ProfileComp;