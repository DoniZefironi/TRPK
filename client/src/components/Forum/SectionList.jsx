
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSections } from '../../store/slice/forumSlice';
import { Link } from 'react-router-dom';

const SectionList = () => {
  const dispatch = useDispatch();
  const { sections, status, error } = useSelector((state) => state.forum);

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Выберите раздел форума</h1>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <Link to={`/forum/sections/${section.id}`}>{section.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionList;
