import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header.tsx';
import Footer from './components/Footer/Footer.tsx'
import Main from './pages/Main/Main.tsx';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;