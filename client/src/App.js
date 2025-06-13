import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage'
import ProfileForm from './components/ProfileForm';

const App = () => (
    <Router>
        <Routes>
            <Route path='/' element={<LoginPage/>} />
            <Route path='/signup' element={<SignupPage/>} />
            <Route path='/profile' element={<ProfileForm/>} />
        </Routes>
    </Router>
);

export default App;