import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMaterial, fetchMaterials } from '../../store/slice/materialSlice';
import './CreateMaterialComp.css';

const CreateMaterialComp = ({ onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ 
        topic_materials: '', 
        title: '', 
        description: '', 
        file_url: '' 
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createMaterial(formData)).then(() => {
            dispatch(fetchMaterials({ page: 1 }));
            onClose();
        });
    };

    return (
        <div className="create-material-modal-overlay active">
            <div className="create-material-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="create-material-modal-header">
                    <h2>Добавить материал</h2>
                    <button className="create-material-close-btn" onClick={onClose}>&times;</button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="create-material-form-group">
                        <label>Тема *</label>
                        <input 
                            name="topic_materials" 
                            value={formData.topic_materials}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="create-material-form-group">
                        <label>Название *</label>
                        <input 
                            name="title" 
                            value={formData.title}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="create-material-form-group">
                        <label>Описание</label>
                        <textarea 
                            name="description" 
                            value={formData.description}
                            onChange={handleChange} 
                        />
                    </div>
                    
                    <div className="create-material-form-group">
                        <label>Ссылка на файл</label>
                        <input 
                            name="file_url" 
                            value={formData.file_url}
                            onChange={handleChange} 
                        />
                    </div>
                    
                    <div className="create-material-form-actions">
                        <button type="button" className="create-material-cancel-btn" onClick={onClose}>
                            Закрыть
                        </button>
                        <button type="submit" className="create-material-submit-btn">
                            Добавить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMaterialComp;