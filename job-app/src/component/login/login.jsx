import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './login.css';

const Login = ({ onUserUpdate }) => {
  const navigate = useNavigate();
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
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onUserUpdate(response.data.user);
      navigate('/');
      setFormData({ UserName: "", email: "", Phonenumber: "", Password: "", confirmPassword: "" });
    } catch (error) {
      setErrorMessage(error.response?.data.message || "Login failed");
      console.error('Login Error:', error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const { UserName, email, Phonenumber, Password, confirmPassword } = formData;

    if (!UserName || !email || !Phonenumber || !Password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (Password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        UserName,  // Consistent field name
        email,
        Phonenumber,
        password: Password,
      });
      setSuccessMessage("Signup successful!");
      navigate('/');
      setFormData({ UserName: "", email: "", Phonenumber: "", Password: "", confirmPassword: "" });
    } catch (error) {
      console.error("Signup Error:", error);
      setErrorMessage(error.response?.data.message || "Signup failed: No response from server");
    }
  };

  return (
    <div className='ll'>
      <div className="main">  	
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form onSubmit={handleSignup}>
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <input name="UserName" type="text" placeholder="Username" value={formData.UserName} onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input name="Phonenumber" type="text" placeholder="Phone Number" value={formData.Phonenumber} onChange={handleChange} />
            <input name="Password" type="password" placeholder="Password" value={formData.Password} onChange={handleChange} />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            <button type="submit" className='bbutton'>Sign Up</button>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
            <input type="password" name="Password" placeholder="Password" required value={formData.Password} onChange={handleChange} />
            <button type="submit" className='bbutton'>Login</button>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
