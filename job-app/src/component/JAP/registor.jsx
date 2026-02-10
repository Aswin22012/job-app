import React, { useState } from 'react';
import axios from 'axios';
import './registor.css';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    address: '',
    position: '',
    gender: 'Male',
    jobType: 'Job',
    educationLevel: 'Undergraduate',
    resume: null,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = new FormData();
    form.append('username', formData.username);
    form.append('email', formData.email);
    form.append('phoneNumber', formData.phoneNumber);
    form.append('address', formData.address);
    form.append('position', formData.position);
    form.append('gender', formData.gender);
    form.append('jobType', formData.jobType);
    form.append('educationLevel', formData.educationLevel);
    form.append('resume', formData.resume);
  
    try {
      const response = await axios.post('http://localhost:5000/api/registration', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.status === 200) {
        setSuccessMessage('Registration Successful!');
        setErrorMessage('');
      } else {
        setErrorMessage('Something went wrong.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Failed to register. Please try again later.');
    }
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
};


  return (
    <div className='rg-form'>
      <div className="registration-container">
        <h2 className="registration-header">Registration</h2>
        {errorMessage && <div className="registration-message error">{errorMessage}</div>}
        {successMessage && <div className="registration-message success">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="registration-form" encType="multipart/form-data">
          {/* Form Fields */}
          <div className="registration-group">
            <label className="registration-label">Username:</label>
            <input
              type="text"
              name="username"
              className="registration-input"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="registration-group">
            <label className="registration-label">Email:</label>
            <input
              type="email"
              name="email"
              className="registration-input"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="registration-group">
            <label className="registration-label">Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              className="registration-input"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>

          <div className="registration-group">
            <label className="registration-label">Address:</label>
            <input
              type="text"
              name="address"
              className="registration-input"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter your address"
            />
          </div>

          <div className="registration-group">
            <label className="registration-label">Position:</label>
            <input
              type="text"
              name="position"
              className="registration-input"
              value={formData.position}
              onChange={handleChange}
              required
              placeholder="Enter your position"
            />
          </div>

          <div className="registration-group">
            <label className="registration-label">Gender:</label>
            <select
              name="gender"
              className="registration-select"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="registration-group">
            <label className="registration-label">Job Type:</label>
            <select
              name="jobType"
              className="registration-select"
              value={formData.jobType}
              onChange={handleChange}
              required
            >
              <option value="Job">Job</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="registration-group">
            <label className="registration-label">Education Level:</label>
            <select
              name="educationLevel"
              className="registration-select"
              value={formData.educationLevel}
              onChange={handleChange}
              required
            >
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>

          <div className="registration-group">
            <label className="registration-label">Upload Resume:</label>
            <input
              type="file"
              name="resume"
              className="registration-file-input"
              onChange={handleFileChange}
              accept=".pdf, .doc, .docx"
              required
            />
          </div>

          <button type="submit" className="registration-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
