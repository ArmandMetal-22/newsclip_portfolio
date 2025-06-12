import React, { useState } from 'react';
import ExperienceFormModal from './ExperienceFormModal';
import EducationFormModal from './EducationFormModal';
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
    linkedin: '',
    github: '',
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  const [experiences, setExperiences] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [educations, setEducations] = useState([]);
  const [showEduModal, setShowEduModal] = useState(false);

  const handleSave = async () => {
    const fullProfile = {
      ...profile,
      skills,
      experiences,
      educations
    };

    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullProfile),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile.");
      }

      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Something went wrong.");
    }
  };

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
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      display: 'flex',
      gap: '40px',
      alignItems: 'flex-start'
    }}>
      {/* Left Side - Main Form */}
      <div style={{ flex: 1 }}>
        <form>
          <input name="name" placeholder="Name" value={profile.name} onChange={handleChange} /><br />
          <input name="email" placeholder="Email" value={profile.email} onChange={handleChange} /><br />

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
                    onClick={() => setExperiences(experiences.filter((_, i) => i !== index))}
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

          <div style={{ marginTop: '20px' }}>
            <h3>Education</h3>
            <button type="button" onClick={() => setShowEduModal(true)}>Add Education</button>
            <ul>
              {educations.map((edu, index) => (
                <li key={index} style={{ marginBottom: '10px', position: 'relative' }}>
                  <strong>{edu.degree}</strong> in {edu.fieldOfStudy} at {edu.school} ({edu.startMonth}/{edu.startYear} - {edu.currentlyStudying ? 'Present' : `${edu.endMonth}/${edu.endYear}`})<br />
                  <em>Grade: {edu.grade}</em>
                  <p>{edu.description}</p>
                  <button
                    type="button"
                    onClick={() => setEducations(educations.filter((_, i) => i !== index))}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'red'
                    }}
                    title="Delete education"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button type="button" onClick={handleSave} style={{ marginTop: '20px'}}>
              Save Profile
          </button>
        </form>
      </div>

      {/* Right Side - LinkedIn-style Sidebar */}
      <div style={{
        width: '250px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}>
        <h4 style={{ marginBottom: '16px' }}>Links</h4>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="linkedin" style={{ fontWeight: 'bold', fontSize: '14px' }}>LinkedIn:</label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            placeholder="https://linkedin.com/in/..."
            value={profile.linkedin}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '6px',
              fontSize: '13px',
              marginTop: '4px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="github" style={{ fontWeight: 'bold', fontSize: '14px' }}>GitHub:</label>
          <input
            type="text"
            id="github"
            name="github"
            placeholder="https://github.com/..."
            value={profile.github}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '6px',
              fontSize: '13px',
              marginTop: '4px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Followers Section (blank placeholder) */}
        <div style={{ borderTop: '1px solid #ccc', paddingTop: '16px' }}>
          <h4 style={{ fontSize: '16px', marginBottom: '0' }}>Followers</h4>
          <div style={{
            minHeight: '100px',
            backgroundColor: '#fff',
            marginTop: '10px',
            border: '1px dashed #ccc',
            borderRadius: '4px',
            padding: '10px',
            textAlign: 'center',
            color: '#999',
            fontStyle: 'italic'
          }}>
            (Coming soon)
          </div>
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <ExperienceFormModal
          onClose={() => setShowModal(false)}
          onSave={(newExp) => {
            if (newExp.current && experiences.some(exp => exp.current)) {
              alert("Only one job can be marked as 'current'.");
              return;
            }
            const updated = [...experiences, newExp];
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

      {showEduModal && (
        <EducationFormModal
          onClose={() => setShowEduModal(false)}
          onSave={(newEdu) => {
            if (newEdu.currentlyStudying && educations.some(e => e.currentlyStudying)) {
              alert("Only one education can be marked as 'currently studying'.");
              return;
            }
            const updated = [...educations, newEdu];
            updated.sort((a, b) => {
              if (a.currentlyStudying) return -1;
              if (b.currentlyStudying) return 1;
              const aYear = parseInt(a.endYear || 0);
              const bYear = parseInt(b.endYear || 0);
              const aMonth = monthToNumber(a.endMonth);
              const bMonth = monthToNumber(b.endMonth);
              if (bYear !== aYear) return bYear - aYear;
              return bMonth - aMonth;
            });
            setEducations(updated);
            setShowEduModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ProfileForm;
