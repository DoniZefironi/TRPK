import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/header';
import { checkAuth } from "./store/slice/authSlice"; 
import Loading from "./Components/Loading/loading";
import Main from './pages/Main/Main';
import './App.css';

const App = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.isLoading);
    const user = useSelector(state => state.auth.user); 
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(checkAuth()).finally(() => {
                setIsInitialized(true);
            });
        } else {
            setIsInitialized(true);
        }
    }, [dispatch]);

    if (!isInitialized) {
        return <Loading />;
    }

    return (
        <div className="App">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;