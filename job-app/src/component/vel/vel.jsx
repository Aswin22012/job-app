import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './vel.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(null);  // Add error state

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');  // Retrieve token if authentication is needed
        const response = await fetch('http://localhost:5000/api/jobs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Attach token to header if needed
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'An error occurred while fetching jobs');
        }
      } catch (error) {
        console.error("Error fetching Jobs:", error);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);  // Stop loading after fetch is done
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading jobs...</div>;  // Show loading message
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if there is an error
  }

  return (
    <div className="job-card-container">
      <h2 className="job-header">Available Jobs</h2>
      <div className="job-cards">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <Card key={index} style={{ width: '18rem', margin: '1rem' }} className="job-card">
              <Card.Body>
                <Card.Title className="job-title">{job.title}</Card.Title>
                <Card.Subtitle className="job-company">{job.company}</Card.Subtitle>
                <Card.Text className="job-description">{job.description}</Card.Text>
                <Link to="/vel/registor">
                  <button className="btn-tertiary">Register</button>
                </Link>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div>No jobs available</div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
