const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  position: { type: String, required: true },
  gender: { type: String, required: true },
  jobType: { type: String, required: true },
  educationLevel: { type: String, required: true },
  resume: { type: String } // Path to resume file
}, { collection: 'registration' }); // Set collection name to 'registration'

module.exports = mongoose.model('Registration', RegistrationSchema);
    