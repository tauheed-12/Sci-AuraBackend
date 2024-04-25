// routes/uploadImage.js
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dffp285mq', 
  api_key: process.env.APIKEY, 
  api_secret: process.env.APISECRET 
});

router.post('/uploadImg', async (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'No image data provided' });
  }

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'Profile'
    });

    console.log(result);

    res.status(200).json({ success: true, imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
});

module.exports = router;
