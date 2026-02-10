import React from 'react';
import './home1.css';
import {Link} from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='hn'>
    <div className="homepage">


      {/* Hero Section */}
      

      {/* About Section */}
      <section className="about-section">
        <h2>Why Choose JobFinder?</h2>
        <p>We connect you with top employers, offering roles across various industries. Start your journey to a fulfilling career today.</p>
      </section>

      {/* Featured Jobs Section */}
      <section className="featured-jobs">
        <h2>Featured Jobs</h2>
        <div className="job-list">
          <div className="job-item">
            <h3>Software Engineer</h3>
            <p>Google - Mountain View, CA</p>
            <Link to='vel/registor'><button>Apply Now</button></Link>
          </div>
          <div className="job-item">
            <h3>Marketing Specialist</h3>
            <p>Amazon - Seattle, WA</p>
            <Link to='vel/registor'><button>Apply Now</button></Link>
          </div>
          <div className="job-item">
            <h3>Data Analyst</h3>
            <p>Facebook - New York, NY</p>
            <Link to='vel/registor'><button>Apply Now</button></Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 JobFinder. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
};

export default HomePage;
