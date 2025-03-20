import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main.jsx';
import './App.css';
import CoursesSection from './pages/Curses/Curses.jsx';
import Contacts from './pages/Contacts/Contacts.jsx';

const App = () => {
    return (
        <div className="App">
            {/* <Header /> */}
            <main>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/course" element={<CoursesSection/>} />
                    <Route path="/contacts" element={<Contacts/>} />
                </Routes>
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default App;