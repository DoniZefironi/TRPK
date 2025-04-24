import React, { useState, useEffect } from 'react';
import lessonService from '../../service/LectureService';
import './UpdateLessonModal.css';

const UpdateLessonModal = ({ isOpen, onClose, course, lesson, onLessonUpdated }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        date: '',
        slides: '',
        id_materials: ''
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        if (lesson) {
            setFormData({
                title: lesson.lecture_title || '',
                description: lesson.description || '',
                duration: lesson.duration || '',
                date: lesson.date || '',
                slides: lesson.slides || '',
                id_materials: lesson.id_materials || ''
            });
        }
    }, [lesson]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            if (!course || !lesson?.id) {
                throw new Error('Недостаточно данных для обновления урока');
            }
            
            await lessonService.updateLesson(course, lesson.id, formData);
            onLessonUpdated();
            onClose();
        } catch (error) {
            console.error('Ошибка при обновлении урока:', error);
            setError(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Редактировать урок</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
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
                            Сохранить
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

export default UpdateLessonModal;