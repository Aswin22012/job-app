require('dotenv').config();  // Use .env for configuration
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

const auth = require("./routes/auth");
const profileRoutes = require('./routes/profile');
const authenticateJWT = require('./middleware/authenticateJWT'); // Moved middleware to separate file

const app = express();
app.use(express.json());
app.use(cors());

const corsOptions = {
  origin: 'http://localhost:3000', // or the URL where your React app is hosted
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Serve static files (e.g., profile images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Use the auth routes for signup and login
app.use('/api/auth', auth);  // This will handle both signup and login routes

// Protected API route to fetch companies
app.get("/api/companies", async (req, res) => {
  try {
    const companies = await mongoose.connection.collection("company").find().toArray();
    console.log(companies); // Log to check the fetched data
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error); // Log error for debugging
    res.status(500).json({ message: "Error fetching companies", error });
  }
});



// Protected API route to fetch jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await mongoose.connection.collection("Jobs").find().toArray();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
});

// Route to handle profile routes
app.use('/api/user', authenticateJWT, profileRoutes);  // Protect profile routes

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the app if MongoDB connection fails
  });

// Start the server on port 5000
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
