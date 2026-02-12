import React, { useState } from 'react';
import './contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Your message has been sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you! Our team is always here to chat.</p>
      </div>

      <div className="contact-content">

        {/* Horizontal Contact Cards */}
        <div className="contact-cards-row">
          <div className="contact-card-item">
            <span className="icon">📧</span>
            <h3>Email Us</h3>
            <p>support@jobfinder.com</p>
          </div>
          <div className="contact-card-item">
            <span className="icon">📞</span>
            <h3>Call Us</h3>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="contact-card-item">
            <span className="icon">📍</span>
            <h3>Visit Us</h3>
            <p>123 Job Street, Tech City</p>
          </div>
        </div>

        {/* Wide Form Section */}
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="wide-contact-form">
            <div className="form-header">
              <h2>Send a Message</h2>
              <p>We'll get back to you within 24 hours.</p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>
            </div>

            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
