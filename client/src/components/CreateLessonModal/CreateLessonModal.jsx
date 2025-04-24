import React, { useState } from 'react';
import lessonService from '../../service/LectureService';
import './CreateLessonModal.css';

const CreateLessonModal = ({ isOpen, onClose, course, onLessonCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        date: '',
        slides: '',
        id_materials: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await lessonService.createLesson(course, formData);
            onLessonCreated();
            onClose();
        } catch (error) {
            console.error('Ошибка при создании урока:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Создать урок</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Название *</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Описание *</label>
                        <textarea 
                            name="description" 
                            value={formData.description}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Длительность (мин) *</label>
                        <input 
                            type="number" 
                            name="duration" 
                            value={formData.duration}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Дата *</label>
                        <input 
                            type="date" 
                            name="date" 
                            value={formData.date}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Ссылка на слайды</label>
                        <input 
                            type="text" 
                            name="slides" 
                            value={formData.slides}
                            onChange={handleChange} 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>ID материала</label>
                        <input 
                            type="text" 
                            name="id_materials" 
                            value={formData.id_materials}
                            onChange={handleChange} 
                        />
                    </div>
                    
                    <div className="modal-buttons">
                        <button type="submit" className="submit-btn">
                            Создать
                        </button>
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateLessonModal;