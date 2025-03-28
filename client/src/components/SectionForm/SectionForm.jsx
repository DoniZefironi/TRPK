import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSection } from '../../store/slice/sectionSlice';
import './SectionForm.css'

const SectionForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    type: '',
    name: '',
    subsections: '',
    moderators: '',
    id_user: 1, // Замените на ID текущего пользователя
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSection(formData))
      .unwrap()
      .then(() => alert('Секция успешно добавлена!'))
      .catch((error) => alert(`Ошибка: ${error}`));
  };

  return (
    <div className='sectionforn'>
      <h2>Добавить новую секцию</h2>
      <form onSubmit={handleSubmit}>
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Выберите тип</option>
          <option value="electric">Electric</option>
          <option value="iot">IoT</option>
          <option value="school">School</option>
        </select>
        <input
          type="text"
          name="name"
          placeholder="Название секции"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subsections"
          placeholder="Подсекции"
          value={formData.subsections}
          onChange={handleChange}
        />
        <input
          type="text"
          name="moderators"
          placeholder="Модераторы"
          value={formData.moderators}
          onChange={handleChange}
        />
        <button type="submit">Добавить секцию</button>
      </form>
    </div>
  );
};

export default SectionForm;
