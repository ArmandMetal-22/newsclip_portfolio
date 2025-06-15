import React, { useState } from 'react';
import ExperienceFormModal from './ExperienceFormModal';
import EducationFormModal from './EducationFormModal';
import { FaTrash, FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import '../styles/Profile.css';

const monthToNumber = (month) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.indexOf(month);
};

const stored = localStorage.getItem('profile');
const initial = stored ? JSON.parse(stored) : {};

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    name: initial.name || '',
    email: initial.email || '',
    headline: initial.headline || '',
    location: initial.location || '',
    linkedin: initial.linkedin || '',
    github: initial.github || '',
    website: initial.github || '',
    summary: initial.summary || '',
    phone: initial.phone || '',
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEduModal, setShowEduModal] = useState(false);
  const [activeTab, setActiveTab] = useState('skills');
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSave = async () => {
    const fullProfile = {
      ...profile,
      skills,
      experiences,
      educations,
    };

    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullProfile),
      });

      if (!response.ok) throw new Error('Failed to save profile.');
      alert('Profile saved successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-left">
        {/* Profile Header with Edit Controls */}
        <div className="profile-header">
          <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Profile" className="profile-avatar"/>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0 }}>{profile.name || 'Your Name'}</h2>
            <p style={{ margin: 0, color: 'gray' }}>{profile.headline || 'Your Headline'}</p>
            <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>{profile.location}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {!isEditing && <button className='lineBtn' onClick={() => setIsEditing(true)}>Edit</button>}
            {isEditing && (
              <>
                <button className="saveBtn" onClick={handleSave} style={{ padding: '5px 10px' }}>
                  Save
                </button>
                <button className="cancelBtn" onClick={() => setIsEditing(false)} style={{ padding: '5px 10px' }}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {['name', 'headline', 'location', 'email', 'phone'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={profile[field]}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        ))}

        <textarea 
          name="summary"
          className="profile-summary"
          placeholder="Tell us about yourself..."
          value={profile.summary}
          onChange={handleChange}
          readOnly={!isEditing}
        />

        {/* Tab Navigation */}
        <div className="tab-nav">
          {['skills', 'experience', 'education'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`tab-button ${activeTab === tab ? 'active' : ''}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Skills Section */}
        {activeTab === 'skills' && (
          <div>
            <h3>Skills</h3>
            {isEditing && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
                <input
                  type="text"
                  placeholder="Enter a skill"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  style={{ width: '200px', padding: '6px' }}
                />
                <button className="roundBtn" type="button" onClick={handleAddSkill}>
                  Add Skill
                </button>
              </div>    
            )} 
            <div className="skills-container" style={{ marginTop: '10px' }}>
              {skills.map((skill, index) => (
                <span
                  key={index}
                  onClick={() => isEditing && handleRemoveSkill(index)}
                  className="skill-pill"
                  style={{ cursor: isEditing ? 'pointer' : 'default' }}
                  title={isEditing ? 'Click to remove' : ''}
                >
                  {skill} {isEditing && '×'}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {activeTab === 'experience' && (
          <div>
            <h3>Experience</h3>
            {isEditing && (
              <button type="button" className="roundBtn" onClick={() => setShowModal(true)}>
                Add Experience
              </button>
            )}
            <ul>
              {experiences.map((exp, index) => (
                <li key={index} style={{ marginBottom: '10px', position: 'relative' }}>
                  <strong>{exp.title}</strong> at {exp.company} ({exp.startMonth}/{exp.startYear} -{' '}
                  {exp.current ? 'Present' : `${exp.endMonth}/${exp.endYear}`})
                  <br />
                  <em>
                    {exp.employmentType} • {exp.locationType} • {exp.location}
                  </em>
                  <p>{exp.description}</p>
                  {isEditing && (
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
                        color: 'red',
                      }}
                      title="Delete experience"
                    >
                      <FaTrash />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Education Section */}
        {activeTab === 'education' && (
          <div>
            <h3>Education</h3>
            {isEditing && (
              <button type="button" className="roundBtn" onClick={() => setShowEduModal(true)}>
                Add Education
              </button>
            )}
            <ul>
              {educations.map((edu, index) => (
                <li key={index} style={{ marginBottom: '10px', position: 'relative' }}>
                  <strong>{edu.degree}</strong> in {edu.fieldOfStudy} at {edu.school} (
                  {edu.startMonth}/{edu.startYear} -{' '}
                  {edu.currentlyStudying ? 'Present' : `${edu.endMonth}/${edu.endYear}`})
                  <br />
                  <em>Grade: {edu.grade}</em>
                  <p>{edu.description}</p>
                  {isEditing && (
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
                        color: 'red',
                      }}
                      title="Delete education"
                    >
                      <FaTrash />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="profile-sidebar">
        <h4>Links</h4>

        <div className="sidebar-section">
          <label><FaLinkedin /> LinkedIn:</label>
          <input name="linkedin" value={profile.linkedin} onChange={handleChange} readOnly={!isEditing} placeholder="https://linkedin.com/in/..." />
        </div>

        <div className="sidebar-section">
          <label><FaGithub /> GitHub:</label>
          <input name="github" value={profile.github} onChange={handleChange} readOnly={!isEditing} placeholder="https://github.com/..." />
        </div>

        <div className="sidebar-section">
          <label><FaGlobe /> Website:</label>
          <input name="website" value={profile.website} onChange={handleChange} readOnly={!isEditing} placeholder="https://yourportfolio.com" />
        </div>

        <div className="sidebar-section">
          <h4>Followers</h4>
          <div className="followers-box">(Coming soon)</div>
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <ExperienceFormModal
          onClose={() => setShowModal(false)}
          onSave={(newExp) => {
            if (newExp.current && experiences.some((exp) => exp.current)) {
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
            if (newEdu.currentlyStudying && educations.some((e) => e.currentlyStudying)) {
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
