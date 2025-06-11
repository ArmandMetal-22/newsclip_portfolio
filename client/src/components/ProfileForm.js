import React, { useState } from 'react';

const ProfileForm = () =>{
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        skills: '',
        experience: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    return (
        <form>
            <input name="name" placeholder="Name" onchange={handleChange} /><br />
            <input name="email" placeholder="Email" onChange={handleChange} /><br />
            <textarea name="skills" placeholder="Skills" onChange={handleChange} /><br />
            <textarea name="experience" placeholder="Experience" onChange={handleChange} /><br />
        </form>
    );
};

export default ProfileForm;