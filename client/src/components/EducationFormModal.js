import React, { useState } from 'react';

const EducationFormModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    currentlyStudying: false,
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    grade: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSave = () => {
    onSave(form);
  };

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{ background: 'white', padding: '20px', width: '500px', borderRadius: '8px' }}>
        <h3>Add Education</h3>

        <input name="school" placeholder="School" value={form.school} onChange={handleChange} /><br />
        <input name="degree" placeholder="Degree" value={form.degree} onChange={handleChange} /><br />
        <input name="fieldOfStudy" placeholder="Field of Study" value={form.fieldOfStudy} onChange={handleChange} /><br />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <label htmlFor="currentlyStudying">Currently Studying</label>
          <input
            id="currentlyStudying"
            type="checkbox"
            name="currentlyStudying"
            checked={form.currentlyStudying}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <select name="startMonth" value={form.startMonth} onChange={handleChange}>
            <option value="">Start Month</option>
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <input type="number" name="startYear" placeholder="Start Year" value={form.startYear} onChange={handleChange} />
        </div>

        {!form.currentlyStudying && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <select name="endMonth" value={form.endMonth} onChange={handleChange}>
              <option value="">End Month</option>
              {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <input type="number" name="endYear" placeholder="End Year" value={form.endYear} onChange={handleChange} />
          </div>
        )}

        <input name="grade" placeholder="Grade" value={form.grade} onChange={handleChange} /><br />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EducationFormModal;