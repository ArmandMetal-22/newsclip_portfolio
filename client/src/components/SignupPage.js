import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const SignupPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password
      })
    });

    if (!response.ok) {
      alert('Signup failed (email may already exist)');
      return;
    }

    const user = await response.json();

    const profileInit = {
      name: form.name,
      email: form.email,
      linkedin: '',
      github: '',
      skills: [],
      experiences: [],
      educations: []
    };

    const profileRes = await fetch('http://localhost:5000/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileInit)
    });

    if (!profileRes.ok) {
      alert('Failed to initialize profile');
      return;
    }

    const profile = await profileRes.json();
      localStorage.setItem('profile', JSON.stringify(profile));
      navigate('/profile');
    };

  return (
    <div className="modal is-open">
      <div className="modal-container">
        <div className="modal-left">
          <h1 className="modal-title">Create Account</h1>
          <p className="modal-desc">Newsclip Developer Profile.</p>

          <div className="input-block">
            <label htmlFor="name" className="input-label">Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
          </div>

          <div className="input-block">
            <label htmlFor="email" className="input-label">Email</label>
            <input id="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          </div>

          <div className="input-block">
            <label htmlFor="password" className="input-label">Password</label>
            <input type="password" id="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
          </div>

          <div className="input-block">
            <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
          </div>

          <div className="modal-buttons">
            <a href="#" onClick={() => navigate('/')}>Back to Login</a>
            <button className="input-button" onClick={handleSignup}>Sign Up</button>
          </div>
        </div>

        <div className="modal-right">
          <img src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80" alt="visual" />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
