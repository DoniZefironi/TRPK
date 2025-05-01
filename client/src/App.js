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
import ForumPage from './pages/Forum/Forum.jsx';
import Journal from './pages/Journal/Journal.jsx';
import GroupsPage from './pages/Groups/Groups.jsx';
import Elective from './pages/Electives/Electives.jsx';
import Users from './pages/Users/Users.jsx'
import Career from './pages/Career/Career.jsx'
import CareerGuidanceFormPage from './components/CareerGuidanceFormPage/CareerGuidanceFormPage.jsx'
import CareerGuidanceViewPage from './components/CareerGuidanceViewPage/CareerGuidanceViewPage.jsx'
import GroupDetailsPage from './pages/GroupDetailsPage/GroupDetailsPage.jsx'
import ElectiveDetailsPage from './components/ElectiveDetails/ElectiveDetails.jsx';

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
                    <Route path="/journal" element={<Journal />}/>
                    <Route path="/" element={<Main />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/career-guidance" element={<Career />} />
                    <Route path="/career-guidance/create" element={<CareerGuidanceFormPage />} />
                    <Route path="/career-guidance/edit/:id_guidance" element={<CareerGuidanceFormPage />} />
                    <Route path="/career-guidance/view/:id_guidance" element={<CareerGuidanceViewPage />} />
                    <Route path="/course" element={<CoursesSection />} />
                    <Route path="/groups" element={<GroupsPage />} />
                    <Route path="/groups/:course/:groupId" element={<GroupDetailsPage  />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/elective" element={<Elective />} />
                    <Route path="/electives/:id" element={<ElectiveDetailsPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/edit-profile" element={<EditProfileComp />} />
                    <Route path="/materials-panel" element={<MaterialsPage />} />
                    <Route path="/section" element={<Section />} />
                    {/* <Route path="/forum" element={<ForumPage />} />
        <Route path="/forum/:forumId" element={<ForumPage />} />
        <Route path="/forum/:forumId/section/:sectionId" element={<ForumPage />} />
        <Route path="/forum/:forumId/section/:sectionId/topic/:topicId" element={<ForumPage />} /> */}
                </Routes>
            </main>
        </div>
    );
};

export default App;