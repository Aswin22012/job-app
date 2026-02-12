const express = require('express');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('../model/mongo');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Profile update route
router.put('/update', authenticateJWT, async (req, res) => {
  const { UserName, email, password } = req.body;
  const updatedData = {};

  if (UserName) updatedData.UserName = UserName;
  if (email) updatedData.email = email;
  if (password) updatedData.password = await bcrypt.hash(password, 10);

  try {
    const user = await User.findByIdAndUpdate(req.user.userId, updatedData, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Upload profile image route
router.post('/uploadProfileImage', authenticateJWT, upload.single('profileImage'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const imagePath = `uploads/${req.file.filename}`;
  try {
    const user = await User.findByIdAndUpdate(req.user.userId, { profileImage: imagePath }, { new: true });
    res.status(200).json({ message: 'Profile image updated', profileImage: imagePath });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
// Fetch user profile route
router.get('/profile', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); // Exclude password field
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
