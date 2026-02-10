const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { check, validationResult } = require('express-validator');
const User = require('../model/mongo');
const Registration=require('../model/regis') // Adjust path to your user model

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// POST route for signup
router.post('/signup', [
  check('UserName').notEmpty().withMessage('User name is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { UserName, email, password, Phonenumber } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ UserName, email, Phonenumber, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'Signup successful', token, user: newUser });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST route for login
router.post('/login', [
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes'); // Save resumes in 'uploads/resumes' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Add timestamp to filename to avoid duplication
  },
});

const upload = multer({ storage: storage });

// Route to handle registration
router.post('/register', upload.single('resume'), async (req, res) => {
  try {
    const { username, email, phoneNumber, address, position, gender, jobType, educationLevel } = req.body;
    const resume = req.file ? req.file.path : null; // Get resume file path if uploaded

    // Create a new registration document
    const newRegistration = new Registration({
      username,
      email,
      phoneNumber,
      address,
      position,
      gender,
      jobType,
      educationLevel,
      resume,
    });

    // Save the registration data to the database
    await newRegistration.save();

    res.status(200).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Failed to register. Please try again later.' });
  }
});

module.exports = router;
