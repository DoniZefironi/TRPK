import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main.jsx';
import './App.css';
import CoursesSection from './pages/Curses/Curses.jsx';
import Contacts from './pages/Contacts/Contacts.jsx';
import Events from './pages/Events/Events.jsx'
import About from './pages/About/About.jsx';
import AuthPage from './pages/Auth/Auth.jsx';

const App = () => {
    return (
        <div className="App">
            {/* <Header /> */}
            <main>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/course" element={<CoursesSection/>} />
                    <Route path="/contacts" element={<Contacts/>} />
                    <Route path="/events" element={<Events/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/auth" element={<AuthPage />} />
                </Routes>
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default App;