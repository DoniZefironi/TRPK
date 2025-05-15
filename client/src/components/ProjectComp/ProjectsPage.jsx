import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  clearSelectedProject
} from '../../store/slice/projectSlice';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const dispatch = useDispatch();
      const currentUser = useSelector(state => state.auth.user);
  const { projects, loading, error } = useSelector((state) => state.projects);
const role = currentUser?.role || '';

  // Получаем курс из localStorage
  const course = localStorage.getItem('permissions') || 'Electric';

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deadlines: ''
  });

  const [editingId, setEditingId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects(course));
  }, [dispatch, course]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.deadlines) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const projectPromise = editingId
      ? dispatch(updateProject({
          id: editingId,
          updatedData: {
            ...formData,
            course
          }
        }))
      : dispatch(createProject({
          ...formData,
          course
        }));

    projectPromise
      .unwrap()
      .then(() => {
        dispatch(fetchProjects(course));
        resetForm();
        setShowFormModal(false);
      })
      .catch((error) => {
        console.error('Ошибка:', error);
        alert(error.message || 'Произошла ошибка');
      });
  };

  const handleEdit = (project) => {
    setFormData({
      name: project.name,
      description: project.description,
      deadlines: project.deadlines
    });
    setEditingId(project.id_project);
    setShowFormModal(true);
  };

  const handleDelete = () => {
    if (deleteTargetId) {
      dispatch(deleteProject({ id: deleteTargetId, course }))
        .unwrap()
        .then(() => {
          setShowDeleteModal(false);
          setDeleteTargetId(null);
        })
        .catch((error) => {
          console.error('Ошибка при удалении проекта:', error);
        });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      deadlines: ''
    });
    setEditingId(null);
    dispatch(clearSelectedProject());
  };

  return (
<div className="pp-page p-6 max-w-4xl mx-auto">
  <h1 className="pp-title text-2xl font-bold mb-4">Проекты ({course})</h1>

  <div className="pp-actions mb-4 flex justify-between items-center">
{role !== 'USER' && (
  <button
    onClick={() => {
      resetForm();
      setShowFormModal(true);
    }}
    className="pp-btn pp-btn-create"
  >
    + Новый проект
  </button>
)}
  </div>

  {error && <p className="pp-error-message text-red-600 mb-2">Ошибка: {error.message || error}</p>}

  {loading ? (
    <p>Загрузка...</p>
  ) : (
    <ul className="pp-list space-y-4">
      {projects.map((project) => (
  <li key={project.id_project} className="pp-item border p-4 rounded flex justify-between">
    <div>
      <h3 className="pp-name font-semibold">{project.name || 'Без названия'}</h3>
      <p className="pp-description">{project.description || 'Нет описания'}</p>
      <p className="pp-deadline text-sm text-gray-500">
        Дедлайн: {project.deadlines || 'Не установлен'}
      </p>
    </div>
    {role !== 'USER' && (
      <div className="pp-actions-buttons flex gap-3">
        <button onClick={() => handleEdit(project)} className="pp-btn pp-btn-edit text-blue-600 hover:underline">
          Редактировать
        </button>
        <button
          onClick={() => {
            setDeleteTargetId(project.id_project);
            setShowDeleteModal(true);
          }}
          className="pp-btn pp-btn-delete text-red-600 hover:underline"
        >
          Удалить
        </button>
      </div>
    )}
  </li>
))}
    </ul>
  )}

  {showFormModal && (
    <div className="pp-modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="pp-modal-content bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="pp-modal-title text-xl font-semibold mb-4">
          {editingId ? 'Редактировать проект' : 'Создать проект'}
        </h2>
        <form onSubmit={handleSubmit} className="pp-form space-y-3">
          <input
            name="name"
            placeholder="Название проекта"
            value={formData.name}
            onChange={handleChange}
            className="pp-input w-full border px-3 py-2 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Описание"
            value={formData.description}
            onChange={handleChange}
            className="pp-textarea w-full border px-3 py-2 rounded"
            required
          />
          <input
            name="deadlines"
            type="date"
            value={formData.deadlines}
            onChange={handleChange}
            className="pp-input w-full border px-3 py-2 rounded"
            required
          />
          <div className="pp-form-buttons flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowFormModal(false);
              }}
              className="pp-btn pp-btn-cancel bg-gray-400 text-white px-4 py-2 rounded"
            >
              Отмена
            </button>
            <button type="submit" className="pp-btn pp-btn-submit bg-blue-600 text-white px-4 py-2 rounded">
              {editingId ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )}

  {showDeleteModal && (
    <div className="pp-modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="pp-modal-content bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="pp-modal-title text-lg font-semibold mb-4">Удалить проект?</h2>
        <p className="pp-modal-text mb-4">Вы уверены, что хотите удалить этот проект?</p>
        <div className="pp-form-buttons flex justify-end gap-2">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="pp-btn pp-btn-cancel bg-gray-400 text-white px-4 py-2 rounded"
          >
            Отмена
          </button>
          <button
            onClick={handleDelete}
            className="pp-btn pp-btn-cancel bg-red-600 text-white px-4 py-2 rounded"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default ProjectsPage;
