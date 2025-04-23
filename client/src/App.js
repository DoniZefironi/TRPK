import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main.jsx';
import './App.css';
import CoursesSection from './pages/Curses/Curses.jsx';
import Contacts from './pages/Contacts/Contacts.jsx';
import Events from './pages/Events/Events.jsx';
import About from './pages/About/About.jsx';
import AuthPage from './pages/Auth/Auth.jsx';
import { clearAuthState } from './store/slice/authSlice'; // Изменено с clearState на clearAuthState
import Profile from './pages/Profile/Profile.jsx';
import EditProfileComp from './components/EditProfileComp/EditProfileComp.jsx';
import MaterialsPage from './pages/MaterialsPage/MaterialsPage.jsx';
import Section from './pages/Section/Section.jsx';
import { ForumPage } from './pages/Forum/Forum';
import { SectionPage } from './pages/SectionPage/SectionPage';
import { TopicPage } from './pages/TopicPage/TopicPage';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(clearAuthState()); // Изменено с clearState на clearAuthState
        }
    }, [dispatch]);

    return (
        <div className="App">
            <main>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/course" element={<CoursesSection />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/edit-profile" element={<EditProfileComp />} />
                    <Route path="/materials-panel" element={<MaterialsPage />} />
                    <Route path="/section" element={<Section />} />
                    <Route path="/forum" element={<ForumPage />} />
                    <Route path="/forum/sections/:sectionId" element={<SectionPage />} />
                    <Route path="/forum/topics/:topicId" element={<TopicPage />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;