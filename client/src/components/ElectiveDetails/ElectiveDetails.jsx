import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchElective,
  addParticipant,
  removeParticipant
} from '../../store/slice/electiveInformaticsSlice';
import { getAllUsers } from '../../store/slice/userSlice';
import './ElectiveDetails.css';

const ElectiveDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentElective, loading } = useSelector(state => state.electives);

  const [showModal, setShowModal] = useState(false);
  const { users, loading: usersLoading, error: usersError } = useSelector(state => state.user);
const informaticsUsers = users?.filter(
  u => u.permissions?.toLowerCase?.() === 'informatics' || 
       (Array.isArray(u.permissions) && u.permissions.includes('informatics'))
) || [];

  const [selectedUserId, setSelectedUserId] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchElective(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  
  useEffect(() => {
    console.log('Все пользователи:', users); // ← посмотри что там
  }, [users]);

  const handleRemove = (userId) => {
    dispatch(removeParticipant({ electiveId: id, userId }));
  };

  const handleAddUser = () => {
    if (selectedUserId) {
      dispatch(addParticipant({ electiveId: id, userId: selectedUserId }));
      setShowModal(false);
      setSelectedUserId('');
    }
  };

  const openAddUserModal = () => {
    console.log("Открытие модального окна"); // ← проверка
    dispatch(getAllUsers());
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUserId('');
  };

  if (loading) return <p>Загрузка факультатива...</p>;
  if (!currentElective) return <p>Факультатив не найден</p>;

  // Фильтруем пользователей, чтобы исключить тех, кто уже является участником
  const availableUsers = informaticsUsers.filter(user =>
    !currentElective.participants.some(participant => participant.id_user === user.id_user)
  );

  return (
    <div className="elective-details-page">
      <h1>{currentElective.name}</h1>
      <p>{currentElective.description}</p>

      <button 
        onClick={openAddUserModal}
        disabled={loadingUsers}
      >
        {loadingUsers ? 'Загрузка...' : 'Добавить пользователя'}
      </button>

      {error && <p className="error-message">{error}</p>}

      <h3>Участники:</h3>
      <ul className="participants-list">
        {currentElective.participants?.length > 0 ? (
          currentElective.participants.map(user => (
            <li key={user.id_user}>
              <span>{user.username}</span> {/* Ник */}
              <span>({user.email})</span> {/* Почта */}
              <button 
                onClick={() => handleRemove(user.id_user)}
                className="remove-button"
              >
                Удалить
              </button>
            </li>
          ))
        ) : (
          <p>Нет участников</p>
        )}
      </ul>

      {showModal && (
        <div className="details-modal" onClick={closeModal}>
          <div className="details-modal-content" onClick={e => e.stopPropagation()}>
            <h3>Добавить пользователя</h3>
            <select
              value={selectedUserId}
              onChange={e => setSelectedUserId(e.target.value)}
              className="user-select"
            >
              <option value="">-- Выбрать пользователя --</option>
              {availableUsers.map(user => (
                <option key={user.id_user} value={String(user.id_user)}>

                  {user.full_name || user.name} ({user.email})
                </option>
              ))}
            </select>
            <div className="modal-actions">
              <button 
                onClick={handleAddUser}
                disabled={!selectedUserId}
                className="confirm-button"
              >
                Добавить
              </button>
              <button 
                onClick={closeModal}
                className="cancel-button"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectiveDetailsPage;
