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
  const { projects, loading, error } = useSelector((state) => state.projects);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deadlines: '',
    course: 'Electric'
  });

  const [editingId, setEditingId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects(formData.course));
  }, [dispatch, formData.course]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();
  
  // Валидация данных перед отправкой
  if (!formData.name || !formData.description || !formData.deadlines) {
    alert('Пожалуйста, заполните все обязательные поля');
    return;
  }

  const projectPromise = editingId 
    ? dispatch(updateProject({ 
        id: editingId, 
        updatedData: {
          name: formData.name,
          description: formData.description,
          deadlines: formData.deadlines,
          course: formData.course
        }
      }))
    : dispatch(createProject({
        name: formData.name,
        description: formData.description,
        deadlines: formData.deadlines,
        course: formData.course
      }));

  projectPromise
    .unwrap()
    .then(() => {
      // Обновляем список проектов после успешного создания/редактирования
      dispatch(fetchProjects(formData.course));
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
      deadlines: project.deadlines,
      course: formData.course
    });
    setEditingId(project.id_project);
    setShowFormModal(true);
  };

  const handleDelete = () => {
    if (deleteTargetId) {
      dispatch(deleteProject({ id: deleteTargetId, course: formData.course }))
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
      deadlines: '',
      course: formData.course
    });
    setEditingId(null);
    dispatch(clearSelectedProject());
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Проекты ({formData.course})</h1>

      {/* Курс переключатель */}
      <div className="mb-4 flex justify-between items-center">
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="border px-3 py-2"
        >
          <option value="Electric">Electric</option>
          <option value="IoT">IoT</option>
        </select>
        <button
          onClick={() => {
            resetForm();
            setShowFormModal(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Новый проект
        </button>
      </div>

      {/* Ошибка */}
      {error && <p className="text-red-600 mb-2">Ошибка: {error.message || error}</p>}

      {/* Загрузка / список */}
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id_project} className="border p-4 rounded flex justify-between">
      <div>
        <h3 className="font-semibold">{project.name || 'Без названия'}</h3>
        <p>{project.description || 'Нет описания'}</p>
        <p className="text-sm text-gray-500">
          Дедлайн: {project.deadlines || 'Не установлен'}
        </p>
      </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(project)}
                  className="text-blue-600 hover:underline"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => {
                    setDeleteTargetId(project.id_project);
                    setShowDeleteModal(true);
                  }}
                  className="text-red-600 hover:underline"
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Модалка формы */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'Редактировать проект' : 'Создать проект'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                placeholder="Название проекта"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-3 py-2"
                required
              />
              <textarea
                name="description"
                placeholder="Описание"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-3 py-2"
                required
              />
              <input
                name="deadlines"
                type="date"
                value={formData.deadlines}
                onChange={handleChange}
                className="w-full border px-3 py-2"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowFormModal(false);
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Отмена
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  {editingId ? 'Сохранить' : 'Создать'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Модалка подтверждения удаления */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Удалить проект?</h2>
            <p className="mb-4">Вы уверены, что хотите удалить этот проект?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Отмена
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
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
