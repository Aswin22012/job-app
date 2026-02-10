import React from 'react';
import './about.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* About Header */}
      <header className="about-header">
        <h1>About JobFinder</h1>
        <p>Your gateway to discovering amazing job opportunities worldwide.</p>
      </header>

      {/* About Content */}
      <section className="about-content">
        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>
            JobFinder is dedicated to connecting job seekers with employers from all industries. Our goal is to simplify the hiring process, making it more accessible, efficient, and transparent for everyone involved. Whether you’re a recent graduate or an experienced professional, JobFinder is here to help you find your dream job.
          </p>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2>Why Choose JobFinder?</h2>
          <ul>
            <li><strong>Extensive Job Listings:</strong> Access a vast database of job openings from reputable companies across the globe.</li>
            <li><strong>Easy Application Process:</strong> Apply for multiple jobs with just a few clicks, thanks to our user-friendly platform.</li>
            <li><strong>Personalized Job Matches:</strong> Get job recommendations based on your profile and preferences.</li>
            <li><strong>Real-Time Notifications:</strong> Receive instant alerts about new job postings and application updates.</li>
            <li><strong>Career Resources:</strong> Benefit from our career advice, interview tips, and resume-building tools to enhance your job search experience.</li>
          </ul>
        </div>

        {/* Vision Section */}
        <div className="vision-section">
          <h2>Our Vision</h2>
          <p>
            We envision a world where finding a job is a seamless, empowering experience. At JobFinder, we are constantly innovating to create an inclusive platform that caters to job seekers from all backgrounds, helping them connect with employers who value their unique skills and talents.
          </p>
        </div>

        {/* Call-to-Action */}
        <div className="cta-section">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of others in finding their dream job with JobFinder. Start exploring our job listings today and take the next step in your career journey.</p>
          <a href="/jobs" className="cta-button">Join JobFinder</a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
