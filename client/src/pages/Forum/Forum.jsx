import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSections } from '../../store/slice/forumThunks';
import ForumSectionCard from '../../components/ForumList/ForumList';
import Headers from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import './Forum.css'

export const ForumPage = () => {
  const dispatch = useDispatch();
  const { sections } = useSelector(state => state.forum);

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  return (
    <>
    <Headers />
    <div className="forum-container">
      <h1>Форум</h1>
      <div className="sections-grid">
        {sections.map(section => (
          <ForumSectionCard key={section.id} section={section} />
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};
