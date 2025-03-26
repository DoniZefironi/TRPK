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
import { clearState } from './store/slice/authSlice'; // Если нужна очистка при ошибках токена
import Profile from './pages/Profile/Profile.jsx';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Здесь вы можете добавить валидацию токена на сервере
        const token = localStorage.getItem('token');
        if (!token) {
            // Если токена нет, очищаем состояние
            dispatch(clearState());
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
                </Routes>
            </main>
        </div>
    );
};

export default App;
