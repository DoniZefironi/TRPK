import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchElectives,
  createElective,
  updateElective,
  deleteElective
} from '../../store/slice/electiveInformaticsSlice';
import './ElectivesPage.css';
import { useNavigate } from 'react-router-dom';

const ElectivesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { electives, loading } = useSelector(state => state.electives);
  const { user } = useSelector(state => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [editElective, setEditElective] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    dispatch(fetchElectives({}));
  }, [dispatch]);

  const handleOpenModal = (elective = null) => {
    setEditElective(elective);
    setFormData(elective || { name: '', description: '' });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (editElective) {
      dispatch(updateElective({ id: editElective.id_elective, data: formData }));
    } else {
      dispatch(createElective(formData));
    }
    setShowModal(false);
  };

  return (
    <div className="electives-page">
      <h1>Факультативы</h1>
{user?.role === 'TEATCHER' && (
  <button className="create-button" onClick={() => handleOpenModal()}>
    Создать факультатив
  </button>
)}
      {loading && <p>Загрузка...</p>}
      <ul className="electives-list">
        {electives.map(e => (
          <li key={e.id_elective}>
            <span onClick={() => navigate(`/electives/${e.id_elective}`)}>{e.name}</span>
{user?.role === 'TEATCHER' && (
  <>
    <button onClick={() => handleOpenModal(e)}>Обновить</button>
    <button onClick={() => dispatch(deleteElective(e.id_elective))}>Удалить</button>
  </>
)}
          </li>
        ))}
      </ul>

      {showModal && (
  <div className="electives-modal">
    <div className="electives-modal-content">
      <h2>{editElective ? 'Редактировать' : 'Создать'} факультатив</h2>
      <input
        type="text"
        placeholder="Название"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <textarea
        placeholder="Описание"
        value={formData.description}
        onChange={e => setFormData({ ...formData, description: e.target.value })}
      />
      <button onClick={handleSubmit}>Сохранить</button>
      <button onClick={() => setShowModal(false)}>Отмена</button>
    </div>
  </div>
)}

    </div>
  );
};

export default ElectivesPage;
