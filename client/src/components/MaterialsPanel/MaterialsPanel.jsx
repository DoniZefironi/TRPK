import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchMaterials,
    deleteMaterial,
} from '../../store/slice/materialSlice';
import CreateMaterialComp from '../CreateMaterialComp/CreateMaterialComp';
import UpdateMaterialModal from '../UpdateMaterialComp/UpdateMaterialComp';
import { FaFileAlt, FaEdit, FaTrash } from 'react-icons/fa';


const MaterialsList = () => {
    const dispatch = useDispatch();
    const { materials, pagination, loading } = useSelector((state) => state.materials);

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchMaterials({ page: currentPage }));
    }, [dispatch, currentPage]);

    const handleDelete = (id) => {
        console.log('Attempting to delete material with ID:', id);
        if (!id) {
            console.error('ID материала не определен');
            return;
        }
        
        if (window.confirm('Вы уверены, что хотите удалить этот материал?')) {
            console.log('Dispatching delete action for ID:', id);
            dispatch(deleteMaterial(id))
                .then(() => {
                    console.log('Delete successful, refreshing materials');
                    dispatch(fetchMaterials({ page: currentPage }));
                })
                .catch(error => {
                    console.error('Ошибка при удалении:', error);
                    console.error('Full error details:', error.response);
                });
        }
    };
    const handleOpenModal = () => {
      console.log('Открываем модальное окно');
      setIsAddModalOpen(true);
  };
  
    const handleUpdate = (material) => {
        setSelectedMaterial(material);
        setIsUpdateModalOpen(true);
    };

    return (
      <div>
          <h2>Список материалов</h2>
          <button onClick={handleOpenModal}>Добавить материал</button>

          {loading ? <p>Загрузка...</p> : (
              <ul>
                  {materials.map((material) => (
                      <li key={material.id_material}>
                          <h3>{material.title}</h3>
                          <p>{material.description}</p>
                          <div className="material-actions">
                              {material.file_url && (
                                  <a 
                                      href={material.file_url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      title="Открыть файл"
                                  >
                                      <FaFileAlt className="file-icon" />
                                  </a>
                              )}
                              <button onClick={() => handleUpdate(material)}>
                                  <FaEdit /> Обновить
                              </button>
                              <button onClick={() => handleDelete(material.id_material)}>
                                  <FaTrash /> Удалить
                              </button>
                          </div>
                      </li>
                  ))}
              </ul>
          )}

            <div>
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    ← Назад
                </button>
                <span>Страница {currentPage} из {pagination.totalPages}</span>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                    disabled={currentPage === pagination.totalPages}
                >
                    Вперед →
                </button>
            </div>

            {isAddModalOpen && <CreateMaterialComp onClose={() => setIsAddModalOpen(false)} />}
            {isUpdateModalOpen && 
                <UpdateMaterialModal 
                    material={selectedMaterial} 
                    onClose={() => setIsUpdateModalOpen(false)} 
                />
            }
        </div>
    );
};

export default MaterialsList;
