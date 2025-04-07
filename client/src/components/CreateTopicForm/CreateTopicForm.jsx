import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTopic } from '../../store/slice/forumSlice';

const CreateTopicForm = () => {
  const dispatch = useDispatch();
  const { sectionType, sectionId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTopic({
      title: formData.title,
      description: formData.description,
      section_type: sectionType,
      id_section: sectionId
    })).then(() => {
      navigate(`/forum/${sectionType}/${sectionId}`);
    });
  };

  return (
    <div className="create-topic">
      <h1>Создать новую тему</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Заголовок темы"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
        <textarea
          placeholder="Описание темы"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        <button type="submit">Создать тему</button>
      </form>
    </div>
  );
};

export default CreateTopicForm;