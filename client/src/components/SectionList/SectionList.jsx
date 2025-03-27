import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSections } from '../../store/slice/sectionSlice';

const SectionList = () => {
    const dispatch = useDispatch();
    const { sections = {}, isLoading, error } = useSelector((state) => state.sections || {});
  
    useEffect(() => {
      dispatch(getSections());
    }, [dispatch]);
  
    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
  
    const allSections = Object.values(sections).flat(); // Если нужен единый массив
    console.log('Все секции:', allSections);
  
    return (
      <div>
        <h2>Секции</h2>
        {allSections.length > 0 ? (
          allSections.map((section) => (
            <div key={section.id_section}>
              <h3>{section.name}</h3>
              <p>Подсекции: {section.subsections}</p>
              <p>Модераторы: {section.moderators}</p>
            </div>
          ))
        ) : (
          <p>Нет доступных секций</p>
        )}
      </div>
    );
  };
  
  export default SectionList;
  
