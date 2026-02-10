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
    // Handle form submission logic here, e.g., send data to an API
    console.log(formData);
    alert('Your message has been sent!');
    setFormData({ name: '', email: '', message: '' }); // Reset form after submission
  };

  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you!</p>
      </header>

      <section className="contact-info">
        <h2>Get in Touch</h2>
        <p>If you have any questions, feedback, or need support, please reach out to us using the form below or through the contact details provided.</p>
        <h3>Contact Details</h3>
        <p><strong>Email:</strong> support@jobfinder.com</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
      </section>
      <section className="contact-form">
        <h2>Contact Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default ContactPage;
