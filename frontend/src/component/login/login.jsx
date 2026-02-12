import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './login.css';

const Login = ({ onUserUpdate }) => {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true); // Toggle between Login and Signup
  const [formData, setFormData] = useState({
    UserName: "",
    email: "",
    Phonenumber: "",
    Password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.Password,
      });
      setSuccessMessage(response.data.message);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onUserUpdate(response.data.user);
      setTimeout(() => navigate('/'), 1000); // Small delay for success message
    } catch (error) {
      setErrorMessage(error.response?.data.message || "Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (formData.Password !== formData.confirmPassword) {
      return setErrorMessage("Passwords do not match");
    }
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        UserName: formData.UserName,
        email: formData.email,
        Phonenumber: formData.Phonenumber,
        password: formData.Password,
      });
      setSuccessMessage("Signup successful! Please login.");
      setIsLoginView(true); // Switch to login view
      setFormData({ ...formData, Password: "", confirmPassword: "" });
    } catch (error) {
      setErrorMessage(error.response?.data.message || "Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* Left Side: Visual/Welcome Panel */}
        <div className="auth-visual">
          <div className="visual-content">
            <h1>Welcome Back</h1>
            <p>Unlock your professional potential with JobFinder.</p>
            <div className="visual-glass">
              <h3>Join 10k+ Professionals</h3>
              <p>Find jobs, connect with companies, and build your career.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="auth-form-wrapper">
          <div className="form-header">
            <h2>{isLoginView ? 'Sign In' : 'Create Account'}</h2>
            <p>
              {isLoginView ? "New here? " : "Already have an account? "}
              <span onClick={() => setIsLoginView(!isLoginView)} className="toggle-link">
                {isLoginView ? "Sign up now" : "Login here"}
              </span>
            </p>
          </div>

          <form onSubmit={isLoginView ? handleLogin : handleSignup} className="auth-form">
            {!isLoginView && (
              <>
                <div className="input-group">
                  <input name="UserName" type="text" placeholder="Username" value={formData.UserName} onChange={handleChange} required />
                  <span className="bar"></span>
                </div>
                <div className="input-group">
                  <input name="Phonenumber" type="text" placeholder="Phone Number" value={formData.Phonenumber} onChange={handleChange} required />
                  <span className="bar"></span>
                </div>
              </>
            )}

            <div className="input-group">
              <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
              <span className="bar"></span>
            </div>

            <div className="input-group">
              <input name="Password" type="password" placeholder="Password" value={formData.Password} onChange={handleChange} required />
              <span className="bar"></span>
            </div>

            {!isLoginView && (
              <div className="input-group">
                <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                <span className="bar"></span>
              </div>
            )}

            {errorMessage && <div className="message error">{errorMessage}</div>}
            {successMessage && <div className="message success">{successMessage}</div>}

            <button type="submit" className="auth-btn">
              {isLoginView ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
