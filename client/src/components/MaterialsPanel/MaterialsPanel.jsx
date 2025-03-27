import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMaterials, removeMaterial, addMaterial, updateMaterial } from '../../store/slice/materialSlice';
import './MaterialsPanel.css';

const MaterialsPanel = () => {
  const { materials, isLoading, error } = useSelector((state) => state.materials);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id_material: null,
    topic_materials: '',
    title: '',
    description: '',
    file_url: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getAllMaterials());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить материал?')) {
      dispatch(removeMaterial(id));
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Редактирование материала
      dispatch(updateMaterial(formData));
    } else {
      // Добавление нового материала
      dispatch(addMaterial(formData));
    }

    setFormData({
      id_material: null,
      topic_materials: '',
      title: '',
      description: '',
      file_url: '',
    });

    setIsEditing(false);
  };

  const handleEdit = (material) => {
    setFormData(material);
    setIsEditing(true);
  };

  if (isLoading) return <p>Загрузка материалов...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="materials-panel-container">
      <h1>Materials Library</h1>

      {/* Форма для добавления и редактирования */}
      <form onSubmit={handleFormSubmit} className="material-form">
        <input
          type="text"
          name="topic_materials"
          placeholder="Topic"
          value={formData.topic_materials}
          onChange={handleFormChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleFormChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleFormChange}
        ></textarea>
        <input
          type="text"
          name="file_url"
          placeholder="File URL"
          value={formData.file_url}
          onChange={handleFormChange}
        />
        <button type="submit">{isEditing ? 'Update Material' : 'Add Material'}</button>
      </form>

      {/* Таблица материалов */}
      {materials.length > 0 ? (
        <table className="materials-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Topic</th>
              <th>Title</th>
              <th>Description</th>
              <th>File URL</th>
              <th>Upload Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material.id_material}>
                <td>{material.id_material}</td>
                <td>{material.topic_materials}</td>
                <td>{material.title}</td>
                <td>{material.description}</td>
                <td>
                  <a href={material.file_url} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                </td>
                <td>{new Date(material.upload_date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(material)}>Редактировать</button>
                  <button onClick={() => handleDelete(material.id_material)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Нет доступных материалов</p>
      )}
    </div>
  );
};

export default MaterialsPanel;
