import React, { useState, useEffect } from 'react';
import './profile.css';
import axios from 'axios';

const Profile = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    email: user?.email || '',
    password: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const defaultProfileImage = 'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png';

  const token = localStorage.getItem("token");

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setIsUserLoading(false);
        return;
      }
      try {
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data); // Debugging log
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsUserLoading(false);
      }
    };
    
    
  
    fetchUserData();
  }, [setUser, token]); // <-- add `token` here in the dependency array
  

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image change and upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file));
      setLoading(true);

      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const response = await axios.post("http://localhost:5000/api/user/uploadProfileImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
        });

        // Update user with new profile image
        setUser({ ...user, profileImage: response.data.profileImage });
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle profile update
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/update`,
        { 
          UserName: formData.UserName,
          email: formData.email,
          password: formData.password || undefined,
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );


      // Update the user in frontend state
      setUser(response.data);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const profileImageUrl = user?.profileImage 
    ? `http://localhost:5000/${user.profileImage}?t=${new Date().getTime()}`
    : imageFile || defaultProfileImage;

  if (isUserLoading) {
    return <p>Loading...</p>;
  }

  if (!token) {
    return <p>Please log in to see your profile.</p>;
  }

  return (
    <div className='pp'>
      <div className="profile-container">
        <h1 className="profile-title">User Profile</h1>
        {user ? (
          <div className="profile-info">
            {editing ? (
              <form onSubmit={handleFormSubmit} className="profile-edit-form">
                <div className="form-group">
                  <label htmlFor="firstName">Name</label>
                  <input
                    type="text"
                    id="UserName"
                    name="UserName"
                    value={formData.UserName}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter new password (optional)"
                  />
                </div>
                <button type="submit" className="edit-profile-btn" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </form>
            ) : (
              <div className="profile-details">
                <p className="profile-name">Name: {user.UserName}</p>
                <p className="profile-email">Email: {user.email}</p>
                <button onClick={() => setEditing(true)} className="edit-profile-btn">
                  Edit Profile
                </button>
              </div>
            )}
            <div className="profile-image1-section">
              <img
                src={profileImageUrl}
                alt="Profile"
                className="profile-image1"
              />
              <div className="edit-overlay">
                <label htmlFor="image-upload" className="edit-button">
                  Edit Profile Image
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="profile-login-message">Please log in to see your profile.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
