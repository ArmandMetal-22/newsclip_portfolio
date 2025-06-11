import React, { useState } from 'react';
import ExperienceFormModal from './ExperienceFormModal';
import { FaTrash } from 'react-icons/fa';

const monthToNumber = (month) => {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return months.indexOf(month);
};

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    experience: '',
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  const [experiences, setExperiences] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (indexToRemove) => {
    setSkills(skills.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <form>
        <input name="name" placeholder="Name" value={profile.name} onChange={handleChange} /><br />
        <input name="email" placeholder="Email" value={profile.email} onChange={handleChange} /><br />

        {/* ✅ Clean, compact skills layout */}
        <div style={{ marginTop: '20px' }}>
          <strong>Skills:</strong>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
            <input
              type="text"
              placeholder="Enter a skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              style={{ width: '200px', padding: '6px' }}
            />
            <button type="button" onClick={handleAddSkill}>Add Skill</button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
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
                {skill} ×
              </span>
            ))}
          </div>
        </div>

        {/* ✅ Experiences section */}
        <div style={{ marginTop: '20px' }}>
          <h3>Experiences</h3>
          <button type="button" onClick={() => setShowModal(true)}>Add Experience</button>
          <ul>
            {experiences.map((exp, index) => (
              <li key={index} style={{ marginBottom: '10px', position: 'relative' }}>
                <strong>{exp.title}</strong> at {exp.company} ({exp.startMonth}/{exp.startYear} - {exp.current ? 'Present' : `${exp.endMonth}/${exp.endYear}`})
                <br />
                <em>{exp.employmentType} • {exp.locationType} • {exp.location}</em>
                <p>{exp.description}</p>
                <button
                  type="button"
                  onClick={() => {
                    const updated = experiences.filter((_, i) => i !== index);
                    setExperiences(updated);
                  }}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'red'
                  }}
                  title="Delete experience"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </form>

      {/* ✅ Experience modal */}
      {showModal && (
        <ExperienceFormModal
          onClose={() => setShowModal(false)}
          onSave={(newExp) => {
            if (newExp.current && experiences.some(exp => exp.current)) {
              alert("Only one job can be marked as 'current'. Please update or remove the existing one.");
              return;
            }

            const updated = [...experiences, newExp];

            // Sort: current job first, then most recent previous
            updated.sort((a, b) => {
              if (a.current) return -1;
              if (b.current) return 1;

              const aYear = parseInt(a.endYear || 0);
              const bYear = parseInt(b.endYear || 0);
              const aMonth = monthToNumber(a.endMonth);
              const bMonth = monthToNumber(b.endMonth);

              if (bYear !== aYear) return bYear - aYear;
              return bMonth - aMonth;
            });

            setExperiences(updated);
            setShowModal(false);
          }}
        />
      )}
    </>
  );
};

export default ProfileForm;
