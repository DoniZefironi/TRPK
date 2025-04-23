import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLecture, editLecture } from '../../store/slice/lectureSlice';
import './LectureModal.css';

const LectureModal = ({ isOpen, onClose, lecture, course }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        lecture_title: '',
        duration: '',
        slides: '',
        description: '',
    });

    // Обновляем данные, когда лекция изменяется
    useEffect(() => {
        if (lecture) {
            setFormData({
                lecture_title: lecture.lecture_title,
                duration: lecture.duration,
                slides: lecture.slides,
                description: lecture.description,
            });
        } else {
            setFormData({
                lecture_title: '',
                duration: '',
                slides: '',
                description: '',
            });
        }
    }, [lecture]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (lecture) {
                await dispatch(editLecture({ course, id: lecture.id, data: formData })).unwrap();
            } else {
                await dispatch(addLecture({ course, data: formData })).unwrap();
            }
            onClose(); // Закрываем модальное окно
        } catch (error) {
            console.error('Ошибка сохранения:', error);
            alert('Ошибка сохранения лекции');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`modal-overlay ${isOpen ? 'show' : ''}`}>
            <div className={`modal-container ${isOpen ? 'show' : ''}`}>
                <div className="modal-header">
                    <h2>{lecture ? 'Редактировать лекцию' : 'Добавить лекцию'}</h2>
                    <button onClick={onClose} >&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="edit-lecture-form">
                    <input type="text" name="lecture_title" value={formData.lecture_title} onChange={handleChange} placeholder="Название лекции" required />
                    <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Длительность" required />
                    <input type="text" name="slides" value={formData.slides} onChange={handleChange} placeholder="Ссылка на слайды" />
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Описание"></textarea>

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">Отмена</button>
                        <button type="submit" className="submit-btn">{lecture ? 'Обновить' : 'Создать'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LectureModal;
