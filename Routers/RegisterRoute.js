const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const uniqid = require('uniqid');
const nodemailer = require('nodemailer');
const Hospital = require('../Models/Hospital');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();

cloudinary.config({ 
  cloud_name: 'dffp285mq', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Only jpeg, jpg, or png are allowed');
    error.code = 'LIMIT_FILE_TYPES';
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
});

router.post('/registers', upload.single('certificate'), async (req, res) => {
  try {
    const {
      hospitalName,
      address,
      city,
      state,
      pincode,
      registrationDate,
      ambulanceCount,
      email,
      phoneNumber,
      registrationNumber,
      wardNumber,
      password,
      confirmPassword
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
    
    const accessCode = await uniqid();
    const hashedPassword = await bcrypt.hash(password, 10);
    let certificateUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload("data:image/jpeg;base64," + req.file.buffer.toString("base64"), {
        folder: 'Certificates'
      });
      certificateUrl = result.secure_url;
      console.log(certificateUrl);
    }

    const newHospital = new Hospital({
      hospitalName,
      address,
      city,
      state,
      pincode,
      registrationDate,
      ambulanceCount,
      email,
      phoneNumber,
      registrationNumber,
      wardNumber,
      accessCode,
      password: hashedPassword,
      certificate: certificateUrl
    });

    await newHospital.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: 'sheikhtauheed95@gmail.com',
      to: email, 
      subject: "Here is your unique access code, keep it secret",
      text: `${accessCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
    });

    res.status(201).json({ message: 'Hospital registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
