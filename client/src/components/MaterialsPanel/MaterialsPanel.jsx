import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchMaterials,
    deleteMaterial,
} from '../../store/slice/materialSlice';
import CreateMaterialComp from '../CreateMaterialComp/CreateMaterialComp';
import UpdateMaterialModal from '../UpdateMaterialComp/UpdateMaterialComp';

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
      if (!id) {
        console.error('ID материала не определен');
        return;
      }
      
      if (window.confirm('Вы уверены, что хотите удалить этот материал?')) {
        dispatch(deleteMaterial(id)).then(() => {
          dispatch(fetchMaterials({ page: currentPage }));
        }).catch(error => {
          console.error('Ошибка при удалении:', error);
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
    <button onClick={() => handleUpdate(material)}>Обновить</button>
    <button onClick={() => handleDelete(material.id_material)}>Удалить</button>
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
