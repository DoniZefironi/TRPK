import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLecture, editLecture } from '../../store/slice/lectureSlice';
import './LectureModal.css';

const LectureModal = ({ course, lecture, closeModal }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        lecture_title: lecture?.lecture_title || '',
        duration: lecture?.duration || '',
        slides: lecture?.slides || '',
    });

    useEffect(() => {
        if (!lecture) {
            setFormData({ lecture_title: '', duration: '', slides: '' });
        }
    }, [lecture]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (lecture) {
            dispatch(editLecture({ course, id: lecture.id, data: formData }));
        } else {
            dispatch(addLecture({ course, data: formData }));
        }
        closeModal();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{lecture ? 'Редактировать лекцию' : 'Добавить лекцию'}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="lecture_title" value={formData.lecture_title} onChange={handleChange} placeholder="Название лекции" required />
                    <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Длительность" required />
                    <input type="text" name="slides" value={formData.slides} onChange={handleChange} placeholder="Ссылка на слайды" />
                    <button type="submit">{lecture ? 'Обновить' : 'Создать'}</button>
                    <button type="button" onClick={closeModal}>Закрыть</button>
                </form>
            </div>
        </div>
    );
};

export default LectureModal;
