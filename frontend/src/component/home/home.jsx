import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(null);  // Add error state

  useEffect(() => {
    let isMounted = true; // Track if component is still mounted

    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token');
        // if (!token) {
        //   console.error('No token found');
        //   setError('No authentication token found. Please log in again.');
        //   setLoading(false);
        //   return;
        // }

        const response = await fetch('http://localhost:5000/api/companies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Add token to Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setCompanies(data);  // Set companies data in state
          }
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'An error occurred while fetching companies');
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
        setError('An unexpected error occurred');
      } finally {
        if (isMounted) {
          setLoading(false);  // Set loading to false once fetching is done
        }
      }
    };

    fetchCompanies();

    return () => {
      isMounted = false;  // Cleanup to avoid setting state after component unmounts
    };
  }, []);

  // If loading, show a loading message
  if (loading) {
    return <div>Loading companies...</div>;
  }

  // If there's an error, display the error message
  if (error) {
    return <div>{error}</div>;
  }

  // If no companies are found
  if (companies.length === 0) {
    return <div>No companies available</div>;
  }

  // If companies are found, display them
  return (
    <div className="card-container">
      <section className="hero-section">
        <div className="hero-content">
          <h2>Find Your Dream Job</h2>
          <p>Browse thousands of job listings from top companies worldwide.</p>
          <form className="search-form">
            <input type="text" placeholder="Job title or keyword" />
            <input type="text" placeholder="Location" />
            <button type="submit">Search</button>
          </form>
        </div>
      </section>

      <div className="jobb-cards">
        {companies.map((company, index) => (
          <div key={index} className="jobb-card">
            <Card.Img className="card-image" variant="top" src={company.logo} alt={`${company.name} logo`} />
            <Card.Body>
              <Card.Title className="card-title">{company.name}</Card.Title>
              <Card.Text className="card-text">{company.content}</Card.Text>
              <div className="button-container">
                <a href={company.link1} className="btn-primary">Company</a>
                <a href={company.link2} className="btn-secondary">Learn More</a>
              </div>
              <Link to="/vel">
                <button className="btn-tertiary">Apply</button>
              </Link>
            </Card.Body>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
