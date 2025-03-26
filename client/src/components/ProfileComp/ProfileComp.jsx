import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../../store/slice/userSlice';
import './ProfileComp.css';

const ProfileComp = () => {
  const { user, isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = '1'; // ID текущего пользователя (можно получить из токена или другого источника)
    dispatch(getUserInfo(userId));
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="profile-container">
      {user ? (
        <>
          <div className="profile-personal-info">
            <h2 className="profile-name">{user.username}</h2>
            <p className="profile-username">@{user.nickname}</p>
            <p className="profile-location">{user.location}</p>
          </div>
          <div className="profile-contacts">
            <h3 className="profile-section-title">Contacts</h3>
            <ul className="profile-contacts-list">
              <li className="profile-contact-item">E-mail: <a href={`mailto:${user.email}`}>{user.email}</a></li>
              <li className="profile-contact-item">Telegram: {user.telegram}</li>
              <li className="profile-contact-item">Phone: {user.phone}</li>
            </ul>
          </div>
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default ProfileComp;
