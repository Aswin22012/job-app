import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const defaultProfileImage = '/images/default-avatar.png';

  const profileImageUrl = user?.profileImage 
    ? `http://localhost:5000/${user.profileImage}` 
    : defaultProfileImage;

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Job Application Portal</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="navbar-ctaa">
        {user ? (
          <>
            <Link to="/profile" className="profile-icon">
              <img src={profileImageUrl} alt="Profile" className="profile-image" />
            </Link>
            <button onClick={handleLogout} className="ln">Logout</button>
          </>
        ) : (
          <Link to="/login" className="cbutton">Get Started</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
