import React from 'react';
import './about.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <header className="about-hero">
        <div className="hero-content">
          <h1>About JobFinder</h1>
          <p>Connecting Talent with Opportunity. Everywhere.</p>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="about-container">

        {/* Mission Section */}
        <section className="about-section mission-section">
          <div className="section-header">
            <h2>Our Mission</h2>
          </div>
          <p>
            JobFinder is dedicated to bridging the gap between ambitious job seekers and forward-thinking employers.
            We strive to make the hiring process transparent, efficient, and human-centric. Whether you're launching your career
            or scaling your team, we are your partner in growth.
          </p>
        </section>

        {/* Features Grid */}
        <section className="about-section features-section">
          <div className="section-header">
            <h2>Why Choose Us?</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🌍</span>
              <h3>Global Reach</h3>
              <p>Access opportunities from top companies worldwide.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🚀</span>
              <h3>Fast Apply</h3>
              <p>One-click applications to save you time.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🎯</span>
              <h3>Smart Matches</h3>
              <p>AI-driven recommendations tailored to your profile.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔔</span>
              <h3>Instant Alerts</h3>
              <p>Be the first to know about new openings.</p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="about-section vision-section">
          <div className="section-header">
            <h2>Our Vision</h2>
          </div>
          <p>
            We envision a world where every individual can find work that is meaningful and fulfilling.
            By leveraging technology and empathy, we are building an inclusive ecosystem where talent meets its true potential.
          </p>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h2>Ready to Shape Your Future?</h2>
          <p>Join thousands of professionals finding their dream roles today.</p>
          <a href="/jobs" className="cta-button">Explore Jobs</a>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
