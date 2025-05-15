import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchMaterials,
    deleteMaterial,
} from '../../store/slice/materialSlice';
import CreateMaterialComp from '../CreateMaterialComp/CreateMaterialComp';
import UpdateMaterialModal from '../UpdateMaterialComp/UpdateMaterialComp';
import { FaFileAlt, FaEdit, FaTrash } from 'react-icons/fa';
import './MaterialsPanel.css';

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
            dispatch(deleteMaterial(id))
                .then(() => {
                    dispatch(fetchMaterials({ page: currentPage }));
                })
                .catch(error => {
                    console.error('Ошибка при удалении:', error);
                });
        }
    };

    const handleOpenModal = () => {
        setIsAddModalOpen(true);
    };
    
    const handleUpdate = (material) => {
        setSelectedMaterial(material);
        setIsUpdateModalOpen(true);
    };

    return (
        <div className="materials-container">
            <div className="materials-header">
                <h2>Список материалов</h2>
                <button className="add-material-btn" onClick={handleOpenModal}>
                    Добавить материал
                </button>
            </div>

            {loading ? (
                <p className="loading-message">Загрузка...</p>
            ) : (
                <ul className="materials-list">
                    {materials.map((material) => (
                        <li key={material.id_material} className="material-item">
                            <h3 className="material-title">{material.title}</h3>
                            <p className="material-description">{material.description}</p>
                            <div className="material-actions">
                                {material.file_url && (
                                    <a 
                                        href={material.file_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="file-link"
                                    >
                                        <FaFileAlt /> Файл
                                    </a>
                                )}
                                <button 
                                    className="action-btn edit-btn"
                                    onClick={() => handleUpdate(material)}
                                >
                                    <FaEdit /> Редактировать
                                </button>
                                <button 
                                    className="action-btn delete-btn"
                                    onClick={() => handleDelete(material.id_material)}
                                >
                                    <FaTrash /> Удалить
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="pagination">
                <button 
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    ← Назад
                </button>
                <span className="page-info">Страница {currentPage} из {pagination.totalPages}</span>
                <button 
                    className="pagination-btn"
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