import React from 'react';
import { Link } from 'react-router-dom';
import './home1.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Dream Job Today</h1>
          <p>Connecting talent with opportunity. Explore thousands of jobs from top companies.</p>
          <div className="hero-buttons">
            <Link to="/vel/registor" className="btn btn-primary">Get Started</Link>
            <Link to="/about" className="btn btn-outline">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-item">
          <h2>10k+</h2>
          <p>Active Jobs</p>
        </div>
        <div className="stat-item">
          <h2>500+</h2>
          <p>Companies</p>
        </div>
        <div className="stat-item">
          <h2>1M+</h2>
          <p>Candidates</p>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="featured-jobs-section">
        <div className="section-header">
          <h2>Featured Opportunities</h2>
          <p>Hand-picked jobs just for you.</p>
        </div>

        <div className="jobs-grid">
          <div className="job-card">
            <div className="job-icon">💻</div>
            <h3>Software Engineer</h3>
            <p className="company">Google</p>
            <p className="location">Mountain View, CA</p>
            <Link to="/vel/registor" className="job-btn">Apply Now</Link>
          </div>

          <div className="job-card">
            <div className="job-icon">🎨</div>
            <h3>Product Designer</h3>
            <p className="company">Airbnb</p>
            <p className="location">San Francisco, CA</p>
            <Link to="/vel/registor" className="job-btn">Apply Now</Link>
          </div>

          <div className="job-card">
            <div className="job-icon">📊</div>
            <h3>Data Analyst</h3>
            <p className="company">Netflix</p>
            <p className="location">Los Gatos, CA</p>
            <Link to="/vel/registor" className="job-btn">Apply Now</Link>
          </div>

          <div className="job-card">
            <div className="job-icon">🚀</div>
            <h3>Marketing Manager</h3>
            <p className="company">Spotify</p>
            <p className="location">New York, NY</p>
            <Link to="/vel/registor" className="job-btn">Apply Now</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-us-section">
        <div className="section-header">
          <h2>Why JobFinder?</h2>
        </div>
        <div className="features-row">
          <div className="feature-box">
            <span className="feature-icon">🔍</span>
            <h3>Smart Search</h3>
            <p>Advanced filters to find the perfect role.</p>
          </div>
          <div className="feature-box">
            <span className="feature-icon">⚡</span>
            <h3>Fast Apply</h3>
            <p>One-click implementation for verified profiles.</p>
          </div>
          <div className="feature-box">
            <span className="feature-icon">🛡️</span>
            <h3>Trusted</h3>
            <p>Verified companies and authentic listings.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2026 JobFinder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
