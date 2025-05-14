import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateMaterial, fetchMaterials } from '../../store/slice/materialSlice';
import './UpdateMaterialComp.css';

const UpdateMaterialModal = ({ material, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        topic_materials: '',
        title: '',
        description: '',
        file_url: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (material) {
            setFormData({
                topic_materials: material.topic_materials || '',
                title: material.title || '',
                description: material.description || '',
                file_url: material.file_url || ''
            });
        }
    }, [material]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await dispatch(updateMaterial({
                id: material.id_material,
                data: formData
            })).unwrap();
            
            dispatch(fetchMaterials({ page: 1 }));
            onClose();
        } catch (err) {
            console.error('Ошибка при обновлении:', err);
            setError(err.message || 'Не удалось обновить материал');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="update-material-modal-overlay active">
            <div className="update-material-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="update-material-modal-header">
                    <h2>Обновить материал</h2>
                    <button className="update-material-close-btn" onClick={onClose}>&times;</button>
                </div>
                
                {error && <div className="update-material-error-message">{error}</div>}
                
                <form onSubmit={handleSubmit} className="update-material-form">
                    <div className="update-material-form-group">
                        <label>Тема *</label>
                        <input 
                            name="topic_materials" 
                            value={formData.topic_materials}
                            onChange={handleChange} 
                            required 
                            disabled={isSubmitting}
                        />
                    </div>
                    
                    <div className="update-material-form-group">
                        <label>Название *</label>
                        <input 
                            name="title" 
                            value={formData.title}
                            onChange={handleChange} 
                            required 
                            disabled={isSubmitting}
                        />
                    </div>
                    
                    <div className="update-material-form-group">
                        <label>Описание</label>
                        <textarea 
                            name="description" 
                            value={formData.description}
                            onChange={handleChange} 
                            disabled={isSubmitting}
                        />
                    </div>
                    
                    <div className="update-material-form-group">
                        <label>Ссылка на файл</label>
                        <input 
                            name="file_url" 
                            value={formData.file_url}
                            onChange={handleChange} 
                            disabled={isSubmitting}
                        />
                    </div>
                    
                    <div className="update-material-form-actions">
                        <button 
                            type="button" 
                            className="update-material-cancel-btn" 
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Закрыть
                        </button>
                        <button 
                            type="submit" 
                            className="update-material-submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Обновление...' : 'Обновить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateMaterialModal;