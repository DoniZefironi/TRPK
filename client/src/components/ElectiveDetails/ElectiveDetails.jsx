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
  const { user } = useSelector(state => state.auth);
  const [showModal, setShowModal] = useState(false);
  const { users } = useSelector(state => state.user);
  const informaticsUsers = (users || []).filter(
    u => typeof u.permissions === 'string' && u.permissions.toLowerCase() === 'informatics'
  );
  const role = user?.role?.toLowerCase() || '';
  const [selectedUserId, setSelectedUserId] = useState('');
  const [error, setError] = useState(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchElective(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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

const handleSendEmail = () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userEmail = storedUser?.email || 'Неизвестный email';

    // 📩 Получатель письма
    const recipientEmail = 'vladneckt@gmail.com'; // Замените на нужный адрес

    // 📝 Тема и текст письма
    const subject = `Запрос информации о факультативе ${currentElective.name}`;
    const body = `Здравствуйте,\n\nЯ ${userEmail}, хотел бы узнать больше о факультативе "${currentElective.name}".\n\nСпасибо!`;

    // 🔗 Открытие Gmail в новой вкладке с заполненными полями
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  } catch (err) {
    setError('Ошибка при подготовке письма');
    console.error(err);
  }
};


  if (loading) return <div className="loading-message">Загрузка факультатива...</div>;
  if (!currentElective) return <div className="error-message">Факультатив не найден</div>;

  const availableUsers = informaticsUsers.filter(user =>
    !currentElective.participants.some(participant => participant.id_user === user.id_user)
  );

  return (
    <div className="elective-details-container">
      <header className="elective-header">
        <h1 className="elective-title">{currentElective.name}</h1>
        <p className="elective-description">{currentElective.description}</p>
      </header>

      <div className="action-section">
        {role === 'teatcher' && (
          <button 
            onClick={() => setShowModal(true)}
            className="action-button primary"
          >
            Добавить пользователя
          </button>
        )}
        
<button onClick={handleSendEmail} className="action-button secondary">
  📩 Запросить добавление в факультатив
</button>

      </div>

      {error && <div className="error-message">{error}</div>}

      <section className="participants-section">
        <h2 className="section-title">Участники</h2>
        {role === 'teatcher' && (
          <div className="stats-container">
            <span>Доступно: {availableUsers.length}</span>
            <span>Участников: {currentElective.participants.length}</span>
          </div>
        )}

        {currentElective.participants?.length > 0 ? (
          <ul className="participants-list">
            {currentElective.participants.map(user => (
              <li key={user.id_user} className="participant-item">
                <div className="user-info">
                  <span className="username">{user.username}</span>
                  <span className="email">({user.email})</span>
                </div>
                {role === 'teatcher' && (
                  <button 
                    onClick={() => handleRemove(user.id_user)}
                    className="action-button danger"
                  >
                    Удалить
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-message">Нет участников</p>
        )}
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Добавить пользователя</h3>
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
                className="action-button primary"
              >
                Добавить
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="action-button secondary"
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