import React, { useState } from 'react';

const ProfileForm = () =>{
    const [profile, setProfile] = useState({
        name: '',
        email: '',
    });
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState('');

    const [experiences, setExperiences] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleAddSkill = () =>{
        const trimmed = skillInput.trim();
        if (trimmed && !skills.includes(trimmed)){
            setSkills([...skills, trimmed]);
            setSkillInput('');
        }
    }

    const handleRemoveSkill = (indexToRemove) => {
        setSkills(skills.filter((_, index) => index !== indexToRemove));
    };

    return (
        <form>
            <input name="name" placeholder="Name" onChange={handleChange} /><br />
            <input name="email" placeholder="Email" onChange={handleChange} /><br />
            
            <div>
                <input 
                    type="text" 
                    placeholder="Enter a skill" 
                    value={skillInput} 
                    onChange={(e) => setSkillInput(e.target.value)} 
                />
                <button type="button" onClick={handleAddSkill}>
                    Add Skill
                </button>
            </div>
            <div style={{marginTop: '10px'}}>
                <strong>Skills:</strong>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '5px'}}>
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            onClick={() => handleRemoveSkill(index)}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: '#007bff',
                                color: 'white',
                                padding: '5px 10px',
                                borderRadius: '20px',
                                fontSize: '14px'
                            }}
                            title="Click to remove"
                            >
                                {skill} x
                            </span>
                    ))}
                </div>
            </div>
        </form>
    );
};

export default ProfileForm;