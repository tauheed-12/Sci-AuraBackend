const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  registrationDate: {
    type: String,
    required: true
  },
  ambulanceCount: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true
  },
  wardNumber: {
    type: String,
    required: true
  },
  accessCode: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  certificate: {
    type: String
  }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
