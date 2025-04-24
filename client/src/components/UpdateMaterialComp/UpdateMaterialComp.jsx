import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMaterial, fetchMaterials } from '../../store/slice/materialSlice';
import './UpdateMaterialComp.css'; 

const UpdateMaterialModal = ({ material, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ 
        topic_materials: material.topic_materials || '',
        title: material.title || '',
        description: material.description || '',
        file_url: material.file_url || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateMaterial({ 
            id: material.id_material, 
            data: formData 
        })).then(() => {
            dispatch(fetchMaterials({ page: 1 }));
            onClose();
        });
    };

    return (
        <div className="modal-overlay active">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Обновить материал</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} className="update-material-form">
                    <div className="form-group">
                        <label>Тема *</label>
                        <input 
                            name="topic_materials" 
                            value={formData.topic_materials}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Название *</label>
                        <input 
                            name="title" 
                            value={formData.title}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Описание</label>
                        <textarea 
                            name="description" 
                            value={formData.description}
                            onChange={handleChange} 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Ссылка на файл</label>
                        <input 
                            name="file_url" 
                            value={formData.file_url}
                            onChange={handleChange} 
                        />
                    </div>
                    
                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Закрыть
                        </button>
                        <button type="submit" className="submit-btn">
                            Обновить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateMaterialModal;