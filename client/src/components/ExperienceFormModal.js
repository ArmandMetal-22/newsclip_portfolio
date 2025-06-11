import React, { useState } from 'react';

const ExperienceFormModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    title: '',
    employmentType: '',
    company: '',
    current: false,
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    location: '',
    locationType: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSave = () => {
    onSave(form);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{ background: 'white', padding: '20px', width: '500px', borderRadius: '8px' }}>
        <h3>Add Experience</h3>

        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} /><br />

        <select name="employmentType" value={form.employmentType} onChange={handleChange}>
          <option value="">Select Employment Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select><br />

        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} /><br />

        {/* Current Role checkbox on the same line as label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <label htmlFor="current">Current Role</label>
          <input
            id="current"
            type="checkbox"
            name="current"
            checked={form.current}
            onChange={handleChange}
          />
        </div>

        {/* Start Date row */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <select name="startMonth" value={form.startMonth} onChange={handleChange}>
            <option value="">Start Month</option>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input
            type="number"
            name="startYear"
            placeholder="Start Year"
            value={form.startYear}
            onChange={handleChange}
          />
        </div>

        {/* End Date row, hidden if current role is checked */}
        {!form.current && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <select name="endMonth" value={form.endMonth} onChange={handleChange}>
              <option value="">End Month</option>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <input
              type="number"
              name="endYear"
              placeholder="End Year"
              value={form.endYear}
              onChange={handleChange}
            />
          </div>
        )}

        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} /><br />

        <select name="locationType" value={form.locationType} onChange={handleChange}>
          <option value="">Select Location Type</option>
          <option value="Remote">Remote</option>
          <option value="On-site">On-site</option>
          <option value="Hybrid">Hybrid</option>
        </select><br />

        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceFormModal;
