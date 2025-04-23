import React, { useEffect, useState } from 'react';
import './EventInEvents.css'; 
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLectures, removeLecture } from '../../store/slice/lectureSlice';
import LectureModal from '../LectureModal/LectureModal';

const EventsSection = ({ course }) => {
  const dispatch = useDispatch();
  const lectures = useSelector((state) => state.lectures.items);
  const loading = useSelector((state) => state.lectures.loading);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);

  useEffect(() => {
    dispatch(getLectures(course));
  }, [dispatch, course]);

  const openModal = (lecture = null) => {
    setSelectedLecture(lecture);
    setModalOpen(true);
};

const closeModal = () => {
    setModalOpen(false);
    setSelectedLecture(null);
};

  if (loading) return <p>Загрузка лекций...</p>;

  return (
    <section className="events-section">
      <h2 className="events-title">НАШИ ЛЕКЦИИ</h2>
      <h3 className="events-subtitle">Лекции и семинары</h3>
      <button className="add-button" onClick={() => openModal()}>Добавить лекцию</button>
      <div className="events-list">
        {lectures.map((lecture, index) => (
          <div className="event-card" key={index}>
            <div className='row-event'>
              <div>
                <p className="event-date">{lecture.date}</p>
                <p className="event-time">{lecture.duration}</p>
              </div>
              <div>
                <h4 className="event-title">{lecture.lecture_title}</h4>
                <p className="event-description">{lecture.description}</p>
              </div>
            </div>
            <button className="event-button" onClick={() => openModal(lecture)}>Обновить</button>
            <button className="event-button" onClick={() => dispatch(removeLecture({ course, id: lecture.id }))}>Удалить</button>
          </div>
        ))}
      </div>
      <div className="more-events">
        <p>Хотите еще?</p>
        <Link to="/events">
          <button className="view-all-button">Просмотреть все события</button>
        </Link>
      </div>

      {isModalOpen && <LectureModal course={course} lecture={selectedLecture} closeModal={closeModal} />}
    </section>
  );
};

export default EventsSection;
